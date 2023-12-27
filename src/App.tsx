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

export const chartOptions: ChartProps["options"] = {
	responsive: true,
	maintainAspectRatio: false,
};

function App() {

	// const chartData = {
    //     labels: ,
    //     datasets: [
    //         {
    //             label: 'Sales',
    //             data: [50, 60, 70, 80, 90],
    //         },
    //     ],
    // }
    

	return <PageContainer></PageContainer>;

	// return (
	// 	<div>
	// 		<input type="file" id="zipInput" accept=".zip" onChange={handleFileChange} /><br></br>
	// 		<Show when={loading()}><div>Loading...</div></Show>
	// 		<Show when={chatData().messages.length > 0} fallback={<div>Data missing...</div>} >
	// 			<span>Total messages: </span>{chatData().messages.length}<br></br>
	// 			<span>Usernames: </span>{chatData().usernames.join(', ')}<br></br>
	// 			<div style={{ display: 'flex' }} >
	// 				<div>
	// 					<span><b><h3>Month analysis:</h3></b></span>
	// 					<DefaultChart type="bar" data={monthChartData()} options={chartOptions} />
	// 				</div>
	// 				<div>
	// 					<span><b><h3>Hour analysis:</h3></b></span>
	// 					<DefaultChart type="bar" data={hourlyChartData()} options={chartOptions} />
	// 				</div>
	// 			</div>
	// 			<div style={{ display: 'flex' }} >
	// 				<div>
	// 					<span><b><h3>Messages per user:</h3></b></span>
	// 					<DefaultChart type='pie' data={{ labels: chatData().usernames, datasets: [{ label: 'Messages', data: chatData().usernames.map(u => chatData().messages.filter(m => m.username === u).length), backgroundColor: 'rgba(255, 99, 132, 0.8)' }] }} options={chartOptions} />
	// 				</div>
	// 				<div>
	// 					<span><b><h3>Messages per user average length:</h3></b></span>
	// 					<DefaultChart type='bar' data={{ labels: chatData().usernames, datasets: [{ label: 'Messages', data: chatData().usernames.map(u => chatData().messages.filter(m => m.username === u).reduce((acc, cur) => acc + cur.message.length, 0) / chatData().messages.filter(m => m.username === u).length), backgroundColor: 'rgba(255, 99, 132, 0.8)' }] }} options={chartOptions} />
	// 				</div>
	// 			</div>
	// 			<div style={{ display: 'flex' }} >
	// 				<div>
	// 					<span><b><h3>Message length analysis:</h3></b></span>
	// 					<DefaultChart type="bar" data={lengthChartData()} options={chartOptions} />
	// 				</div>
	// 				<div>
	// 					<span><b><h3>Day analysis:</h3></b></span>
	// 					<DefaultChart type="line" data={dayChartData()} options={chartOptions} />
	// 				</div>
	// 			</div>
				
	// 		</Show>
	// 		{/* <div>{txtContent()}</div> */}
	// 	</div>
	// );
}

export default App
