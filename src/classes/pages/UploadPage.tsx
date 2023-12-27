import JSZip from "jszip";
import { Show, createSignal } from "solid-js";
import { CurrentPageSet, chatsData, emptyStatData, loading, setChatsData, setCurrentPageSet, setLoading, setStats, stats } from "../../store";
import { parseChatMessages } from "../ChatParser";
import { analyzeHours } from "../analyzer/HourAnalyzer";
import { analyzeLength } from "../analyzer/LengthAnalyzer";
import { analyzeMonths } from "../analyzer/MonthAnalyzer";
import { Page } from "../components/pagePrototype/Page";
import './Page.css';
import { UserData, analyzeUsers } from "../analyzer/UserAnalyzer";
import { ScrollIndicator } from "../components/ScrollIndicator";
import { analyzeDays } from "../analyzer/DayAnalyzer";

let currentUserNameCache = '';

export function UploadPage() {
    const [currentProgress, setCurrentProgress] = createSignal(0);
    const [chatCount, setChatCount] = createSignal(0);

    const handleFiles = async (event: any) => {
        setLoading({ state: true });
        setChatCount(event.target.files.length);
        setCurrentProgress(1);
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            if (file && file.name.endsWith('.zip')) {
                await processZipFile(file);
                // otherwise the user thinks the page is broken lol
                await new Promise(r => setTimeout(r, 500));
                setCurrentProgress(i + 2);
            } else {
                alert("Please upload a ZIP file.");
            }
        }
        processData(event.target.files.length);
        normalizeData();
        setLoading({ state: false });
        // setTimeout(() => {
        // }, 1500);
    };

    const processData = (chatCount: number) => {
        if(chatCount == 1) {
            const monthData = analyzeMonths(chatsData[0]);
            const chatHourData = analyzeHours(chatsData[0]);
            const lengthData = analyzeLength(chatsData[0]);
            const userData = analyzeUsers(chatsData[0]);
            const dayData = analyzeDays(chatsData[0]);
            dayData.days.sort((a, b) => b.count - a.count);
            setStats({
                monthData: {
                    labels: monthData.months.map(m => m.name),
                    datasets: [
                        {
                            label: chatsData[0].usernames[0],
                            data: monthData.months.map(m => m.count),
                        }
                    ]
                },
                hourData: {
                    labels: chatHourData.hours.map(h => h.index),
                    datasets: [
                        {
                            label: chatsData[0].usernames[0],
                            data: chatHourData.hours.map(h => h.count),
                        }
                    ]
                },
                lengthData: {
                    labels: lengthData.lengths.map(l => l.length),
                    datasets: [
                        {
                            label: chatsData[0].usernames[0],
                            data: lengthData.lengths.map(l => l.count),
                        }
                    ]
                },
                userData: {
                    labels: userData.users.map(u => u.name),
                    datasets: [
                        {
                            label: 'Usernames',
                            data: userData.users.map(u => u.count),
                        }
                    ]
                },
                busyDay: {
                    date: dayData.days[0].date,
                    messageCount: dayData.days[0].count,
                }
            });
        } else {
            let userDataAccumulated: UserData = {users: []};
            for (let i = 0; i < chatsData.length; i++) {
                const chatData = chatsData[i];
                const monthData = analyzeMonths(chatData);
                const chatHourData = analyzeHours(chatData);
                const lengthData = analyzeLength(chatData);
                const userData = analyzeUsers(chatData);
                // suppose only private chats
                if(userDataAccumulated.users.some(u => u.name == chatData.usernames[0])) {
                    userDataAccumulated.users.find(u => u.name == chatData.usernames[0])!.count += userData.users[0].count;
                } else {
                    userDataAccumulated.users.push(userData.users[0]);
                }
                if(userDataAccumulated.users.some(u => u.name == chatData.usernames[1])) {
                    userDataAccumulated.users.find(u => u.name == chatData.usernames[1])!.count += userData.users[1].count;
                } else {
                    userDataAccumulated.users.push(userData.users[1]);
                }
                setStats({
                    monthData: {
                        labels: monthData.months.map(m => m.name),
                        datasets: [
                            ...(stats.monthData?.datasets ?? []),
                            {
                                label: chatData.usernames[0] + chatData.usernames[1],
                                data: monthData.months.map(m => m.count),
                            }
                        ]
                    },
                    hourData: {
                        labels: chatHourData.hours.map(h => h.index),
                        datasets: [
                            ...(stats.hourData?.datasets ?? []),
                            {
                                label: chatData.usernames[0] + chatData.usernames[1],
                                data: chatHourData.hours.map(h => h.count),
                            }
                        ]
                    },
                    lengthData: {
                        labels: lengthData.lengths.map(l => l.length),
                        datasets: [
                            ...(stats.lengthData?.datasets ?? []),
                            {
                                label: chatData.usernames[0] + chatData.usernames[1],
                                data: lengthData.lengths.map(l => l.count),
                            }
                        ]
                    },
                });
            }
            userDataAccumulated.users = userDataAccumulated.users.filter(u => u.name != currentUserNameCache);
            setStats({
                userData: {
                    labels: userDataAccumulated.users.map(u => u.name),
                    datasets: [
                        {
                            label: 'Messages',
                            data: userDataAccumulated.users.map(u => u.count),
                        }
                    ]
                },
            });
            // fix labels
            let stateCopy = JSON.parse(JSON.stringify(stats));
            const stateTypes = ['monthData', 'hourData', 'lengthData'];
            for (let i = 0; i < stateTypes.length; i++) {
                const stateType = stateTypes[i];
                for (let j = 0; j < stateCopy[stateType].datasets.length; j++) {
                    const dataset = stateCopy[stateType].datasets[j]!;
                    dataset.label = dataset.label?.replace(currentUserNameCache, '');
                }
            }
            setStats(stateCopy);
        }
    }

    const normalizeData = () => {
        const dataToNormalize = ['hourData', 'lengthData'];
        let stateCopy: any = JSON.parse(JSON.stringify(stats));
        for (let i = 0; i < dataToNormalize.length; i++) {
            const dataKey = dataToNormalize[i];
            for (let j = 0; j < stateCopy[dataKey]!.datasets.length; j++) {
                const dataset = stateCopy[dataKey]?.datasets[j]!;
                const dataSum = dataset.data.reduce((a: any, b: any) => a + b, 0);
                dataset.data = dataset.data.map((d: any) => (d / dataSum));
            }
        }
        setStats(stateCopy);
    };

    const jsZip = new JSZip();

    const processZipFile = async (zipFile: any) => {
        try {
            const loadedZip = await jsZip.loadAsync(zipFile);
            for (let i  = 0; i < Object.keys(loadedZip.files).length; i++) {
                const fileInZip = Object.keys(loadedZip.files)[i];
                processChatFile(await loadedZip.files[fileInZip].async('text'));
            }
        } catch (error) {
            // TODO better error handling (in terms of resetting the page)
            console.log(error);
            alert("Something went wrong while processing the ZIP file. Are you sure you uploaded the right file? (Groups aren't supported yet)");
            window.location.reload();
        }
    }

    const processChatFile = (fileContent: any) => {
        const parsedData = parseChatMessages(fileContent);
        if(parsedData.usernames.length != 2 || parsedData.messages.length == 0) {
            throw new Error("Invalid chat file. Please make sure you uploaded the right file.");
        }
        if(currentUserNameCache == '') {
            currentUserNameCache = parsedData.usernames.join('');
        } else {
            if(currentUserNameCache.includes(parsedData.usernames[0])) {
                currentUserNameCache = parsedData.usernames[0];
            } else {
                currentUserNameCache = parsedData.usernames[1];
            }
        }
        setChatsData([...chatsData, parsedData]);
    };

    let zipButton: any;

    return <Page>
        <input hidden ref={zipButton} type="file" id="zipInput" accept=".zip" multiple onChange={handleFiles} /><br></br>
        <Show when={!loading.state && chatsData.length == 0}>
            <h1>Please import a chat</h1>
            <h3>Your data is <span class="importantTextHint">only</span> stored on your device and <span class="importantTextHint">safely</span> processed locally!</h3>
            <h3>Everything gets <span class="redTextHint">deleted</span> once you close the page!</h3>
            <br></br>
            <button onClick={() => setCurrentPageSet({current: CurrentPageSet.Tutorial})} >🔍 Tutorial</button>
            <br></br>
            <button onClick={() => zipButton.click()} >💾 Select file(s)</button>
        </Show>
        <Show when={loading.state}>
            <h1>Crunching data...</h1>
            <p>Processing chat {currentProgress()} out of {chatCount()}...</p>
            <progress style={{transition: '1s'}} value={currentProgress()} max={chatCount()}></progress>
        </Show>
        <Show when={!loading.state && chatsData.length > 0}>
            <h1>Great! The chat{chatsData.length > 1 ? 's were' : ' was'} processed!</h1>
            <br></br>
            <button onClick={() => {setChatsData([]); setStats(emptyStatData)}}>♻️ Load another chat</button>
            <ScrollIndicator scrollLength={2} />
        </Show>
    </Page>;
}