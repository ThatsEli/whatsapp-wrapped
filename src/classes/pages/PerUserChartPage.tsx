import { Chart, registerables } from "chart.js";
import { Pie } from "solid-chartjs";
import { onMount } from "solid-js";
import { chartOptions } from "../../App";
import { chatData } from "../../store";
import { ChatData } from "../ChatParser";
import { Page } from "../components/pageProtofype/Page";

export function PerUserChartPage() {

    let localChatData = (): ChatData => {
        return JSON.parse(JSON.stringify(chatData));
    }

    onMount(() => {
        Chart.register(...registerables);
    });

    return <Page>
        <h1>User Chart</h1>
        <div style={{ width: '80vw', height: '60vh' }} >
            <Pie data={
                {
                    labels: localChatData().usernames,
                    datasets: [
                        { 
                            label: 'Messages',
                            data: localChatData().usernames.map(u => localChatData().messages.filter(m => m.username === u).length),
                            // backgroundColor: 'rgba(255, 99, 132, 0.8)' 
                        }
                    ]
                }
            } options={chartOptions} />
        </div>
    </Page>;
}