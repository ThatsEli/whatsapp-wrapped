import { For, Show, createSignal } from 'solid-js'
import JSZip from 'jszip';
import './App.css'
import { ChatData, parseChatMessages } from './classes/ChatParser';
import { analyzeMonths } from './classes/analyzer/MonthAnalyzer';
import { analyzeHours } from './classes/analyzer/HourAnalyzer';
import { ChartProps, DefaultChart } from 'solid-chartjs';
import h from 'solid-js/h';
import { analyzeLength } from './classes/analyzer/LengthAnalyzer';
import { analyzeDays } from './classes/analyzer/DayAnalyzer';
import { PageContainer } from './classes/components/pageProtofype/PageContainer';

function App() {
	const [chatData, setChatData] = createSignal<ChatData>({ messages: [], usernames: [] });
	const [loading, setLoading] = createSignal(false);
	const [monthChartData, setMonthChartData] = createSignal<ChartProps["data"]>({ labels: [], datasets: [] });
	const [hourlyChartData, setHourlyChartData] = createSignal<ChartProps["data"]>({ labels: [], datasets: [] });
	const [lengthChartData, setLengthChartData] = createSignal<ChartProps["data"]>({ labels: [], datasets: [] });
	const [dayChartData, setDayChartData] = createSignal<ChartProps["data"]>({ labels: [], datasets: [] });

	// const chartData = {
    //     labels: ,
    //     datasets: [
    //         {
    //             label: 'Sales',
    //             data: [50, 60, 70, 80, 90],
    //         },
    //     ],
    // }
    const chartOptions: ChartProps["options"] = {
        responsive: false,
        maintainAspectRatio: false,
    }

	const processZip = async (zipFile: any) => {
		setLoading(true);
		try {
			const jsZip = new JSZip();
			const zip = await jsZip.loadAsync(zipFile);
			Object.keys(zip.files).forEach(async (filename) => {
				if (filename.endsWith('.txt')) {
					const fileData = await zip.files[filename].async('text');
					const parsedData = parseChatMessages(fileData);
					const monthData = analyzeMonths(parsedData);
					const hourData = analyzeHours(parsedData);
					const lengthData = analyzeLength(parsedData);
					const dayData = analyzeDays(parsedData);
					setChatData(parsedData);
					setMonthChartData({
						labels: monthData.months.map(m => m.name),
						datasets: [
							{
								label: 'Messages',
								data: monthData.months.map(m => m.count),
								backgroundColor: 'rgba(255, 99, 132, 0.8)',
							}
						]
					});
					setHourlyChartData({
						labels: hourData.hours.map(h => h.index),
						datasets: [
							{
								label: 'Messages',
								data: hourData.hours.map(h => h.count),
								backgroundColor: 'rgba(255, 99, 132, 0.8)',
							}
						]
					});
					setLengthChartData({
						labels: lengthData.lengths.map(l => l.length),
						datasets: [
							{
								label: 'Messages',
								data: lengthData.lengths.map(l => l.count),
								backgroundColor: 'rgba(255, 99, 132, 0.8)',
							}
						]
					});
					setDayChartData({
						labels: dayData.days.map(d => d.index),
						datasets: [
							{
								label: 'Messages',
								data: dayData.days.map(d => d.count),
								backgroundColor: 'rgba(255, 99, 132, 0.8)',
							}
						]
					});
					setLoading(false);
				}
			});
		} catch (e: any) {
			setLoading(false);
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

	// return <PageContainer></PageContainer>;

	return (
		<div>
			<input type="file" id="zipInput" accept=".zip" onChange={handleFileChange} /><br></br>
			<Show when={loading()}><div>Loading...</div></Show>
			<Show when={chatData().messages.length > 0} fallback={<div>Data missing...</div>} >
				<span>Total messages: </span>{chatData().messages.length}<br></br>
				<span>Usernames: </span>{chatData().usernames.join(', ')}<br></br>
				<div style={{ display: 'flex' }} >
					<div>
						<span><b><h3>Month analysis:</h3></b></span>
						<DefaultChart type="bar" data={monthChartData()} options={chartOptions} />
					</div>
					<div>
						<span><b><h3>Hour analysis:</h3></b></span>
						<DefaultChart type="bar" data={hourlyChartData()} options={chartOptions} />
					</div>
				</div>
				<div style={{ display: 'flex' }} >
					<div>
						<span><b><h3>Messages per user:</h3></b></span>
						<DefaultChart type='pie' data={{ labels: chatData().usernames, datasets: [{ label: 'Messages', data: chatData().usernames.map(u => chatData().messages.filter(m => m.username === u).length), backgroundColor: 'rgba(255, 99, 132, 0.8)' }] }} options={chartOptions} />
					</div>
					<div>
						<span><b><h3>Messages per user average length:</h3></b></span>
						<DefaultChart type='bar' data={{ labels: chatData().usernames, datasets: [{ label: 'Messages', data: chatData().usernames.map(u => chatData().messages.filter(m => m.username === u).reduce((acc, cur) => acc + cur.message.length, 0) / chatData().messages.filter(m => m.username === u).length), backgroundColor: 'rgba(255, 99, 132, 0.8)' }] }} options={chartOptions} />
					</div>
				</div>
				<div style={{ display: 'flex' }} >
					<div>
						<span><b><h3>Message length analysis:</h3></b></span>
						<DefaultChart type="bar" data={lengthChartData()} options={chartOptions} />
					</div>
					<div>
						<span><b><h3>Day analysis:</h3></b></span>
						<DefaultChart type="line" data={dayChartData()} options={chartOptions} />
					</div>
				</div>
				
			</Show>
			{/* <div>{txtContent()}</div> */}
		</div>
	);
}

export default App
