import JSZip from "jszip";
import { Show } from "solid-js";
import { CurrentPageSet, StatData, chatsData, emptyStatData, loading, setChatsData, setCurrentPageSet, setLoading, setStats, stats } from "../../store";
import { parseChatMessages } from "../ChatParser";
import { analyzeHours } from "../analyzer/HourAnalyzer";
import { analyzeLength } from "../analyzer/LengthAnalyzer";
import { analyzeMonths } from "../analyzer/MonthAnalyzer";
import { Page } from "../components/pagePrototype/Page";
import { scrollToElement } from "../components/pagePrototype/PageContainer";
import './Page.css';

let currentUserNameCache = '';

export function UploadPage() {

    const handleFiles = async (event: any) => {
        setLoading({ state: true });
        for (let i = 0; i < event.target.files.length; i++) {
            const file = event.target.files[i];
            if (file && file.name.endsWith('.zip')) {
                await processZipFile(file);
            } else {
                alert("Please upload a ZIP file.");
            }
        }
        processData(event.target.files.length);
        normalizeData();
        setLoading({ state: false });
    };

    const processData = (chatCount: number) => {
        if(chatCount == 1) {
            const monthData = analyzeMonths(chatsData[0]);
            const chatHourData = analyzeHours(chatsData[0]);
            const lengthData = analyzeLength(chatsData[0]);
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
            });
        } else {
            for (let i = 0; i < chatsData.length; i++) {
                const chatData = chatsData[i];
                const monthData = analyzeMonths(chatData);
                // const dayData = analyzeDays(chatData);
                const chatHourData = analyzeHours(chatData);
                const lengthData = analyzeLength(chatData);
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
        // for (let i = 0; i < stateCopy.hourData!.datasets.length; i++) {
        //     const dataset = stateCopy.hourData?.datasets[i]!;
        //     const dataSum = dataset.data.reduce((a: any, b: any) => a + b, 0);
        //     dataset.data = dataset.data.map((d: any) => (d / dataSum));
        // }
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
            console.log(error);
        }
    }

    const processChatFile = (fileContent: any) => {
        const parsedData = parseChatMessages(fileContent);
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
            <h1>Please load a chat</h1>
            <button onClick={() => setCurrentPageSet({current: CurrentPageSet.Tutorial})} >🔍 Tutorial</button>
            <br></br>
            <button onClick={() => zipButton.click()} >💾 Select file</button>
        </Show>
        <Show when={loading.state}>
            <h1>Crunching data...</h1>
        </Show>
        <Show when={!loading.state && chatsData.length > 0}>
            <h1>Great! The data was processed!</h1>
            <h3>Your data is <span class="importantTextHint">only</span> stored on your device and <span class="importantTextHint">safely</span> processed locally!</h3>
            <h3>Everything gets <span class="redTextHint">deleted</span> once you close the page!</h3>
            <button onClick={() => {setChatsData([]); setStats(emptyStatData)}}>♻️ Load another chat</button>
            <img onclick={() => scrollToElement(window.innerHeight*2)} class="scrollDownIndicator" src="assets/arrow_scroll_down.svg" onClick={() => {}} />
        </Show>
    </Page>;
}