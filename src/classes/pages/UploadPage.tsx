import JSZip from "jszip";
import { Page } from "../components/pageProtofype/Page";
import { parseChatMessages } from "../ChatParser";
import { analyzeDays } from "../analyzer/DayAnalyzer";
import { analyzeHours } from "../analyzer/HourAnalyzer";
import { analyzeLength } from "../analyzer/LengthAnalyzer";
import { analyzeMonths } from "../analyzer/MonthAnalyzer";
import { setChatData, setMonthChartData, setHourlyChartData, setLengthChartData, setDayChartData, setLoading, loading, chatData, setStats } from "../../store";
import { Show, batch } from "solid-js";

export function UploadPage() {

    const processZip = async (zipFile: any) => {
        setLoading({ state: true });
        try {
            const jsZip = new JSZip();
            const zip = await jsZip.loadAsync(zipFile);
            Object.keys(zip.files).forEach(async (filename) => {
                if (filename.endsWith('.txt')) {
                    const fileData = await zip.files[filename].async('text');
                    console.log(fileData);
                    const parsedData = parseChatMessages(fileData);
                    const monthData = analyzeMonths(parsedData);
                    const hourData = analyzeHours(parsedData);
                    const lengthData = analyzeLength(parsedData);
                    const dayData = analyzeDays(parsedData);
                    batch(() => {
                        setChatData(parsedData);
                        setMonthChartData({
                            data: {
                                labels: monthData.months.map(m => m.name),
                                datasets: [
                                    {
                                        label: 'Messages',
                                        data: monthData.months.map(m => m.count),
                                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                                    }
                                ]
                            }
                        });
                        setHourlyChartData({
                            data: {
                                labels: hourData.hours.map(h => h.index),
                                datasets: [
                                    {
                                        label: 'Messages',
                                        data: hourData.hours.map(h => h.count),
                                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                                    }
                                ]
                            }
                        });
                        setLengthChartData({
                            data: {
                                labels: lengthData.lengths.map(l => l.length),
                                datasets: [
                                    {
                                        label: 'Messages',
                                        data: lengthData.lengths.map(l => l.count),
                                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                                    }
                                ]
                            }
                        });
                        setDayChartData({
                            data: {
                                labels: dayData.days.map(d => d.index),
                                datasets: [
                                    {
                                        label: 'Messages',
                                        data: dayData.days.map(d => d.count),
                                        backgroundColor: 'rgba(255, 99, 132, 0.8)',
                                    }
                                ]
                            }
                        });
                        let busiestDayIndex = dayData.days.reduce((a, b) => a.count > b.count ? a : b).index;
                        const busyDay = {
                            date: dayData.days[busiestDayIndex].date,
                            messageCount: dayData.days[busiestDayIndex].count
                        };
                        setStats({
                            busyDay,
                        });
                    });
                    setLoading({ state: false });
                }
            });
        } catch (e: any) {
            setLoading({ state: false });
            alert("Error reading " + zipFile.name + ": " + e.message);
        }
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        if (file && file.name.endsWith('.zip')) {
            processZip(file);
        } else {
            alert("Please upload a ZIP file.");
        }
    };

    return <Page>
        <Show when={chatData.messages.length === 0 && !loading.state}>
            <h1>Please load a chat</h1>
            <input type="file" id="zipInput" accept=".zip" onChange={handleFileChange} /><br></br>
        </Show>
        <Show when={loading.state}>
            <h1>Crunching data...</h1>
        </Show>
        <Show when={chatData.messages.length > 0}>
            <h1>Great! The data was loaded!</h1>
            <button onClick={() => setChatData({ messages: [], usernames: [] })}>Load another chat</button>
        </Show>
    </Page>;
}
