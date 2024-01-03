import { Chart, registerables } from "chart.js";
import { Bar } from "solid-chartjs";
import { Show, onMount } from "solid-js";
import { chartOptions } from "../../App";
import { chatsData, setStats, stats } from "../../store";
import { Page } from "../components/pagePrototype/Page";

export function MonthChartPage() {
    onMount(() => {
        Chart.register(...registerables);
    })

    let oldData: any = null;

    const changeChart = (e: Event) => {
        if(chatsData.length <= 2) return;
        const checked = (e.target as HTMLInputElement).checked;
        if(checked) {
            const data = JSON.parse(JSON.stringify(stats.monthData));
            if(oldData === null) {
                oldData = JSON.parse(JSON.stringify(stats.monthData));
            }
            const newData = {
                labels: data.labels,
                datasets: [{
                    label: 'Messages',
                    data: data.datasets[0].data.map((d: number, i: number) => d + data.datasets[1].data[i]),
                    backgroundColor: '#3e95cd'
                }]
            };
            setStats({monthData: newData});
        } else {
            setStats({monthData: oldData});
            oldData = null;
        }
    };
    
    return <Page>
        <h1>Month Chart</h1>
        <p>This chart shows the message count per month.</p>
        <div style={{width: '80vw', height: '60vh'}} >
            <Bar data={JSON.parse(JSON.stringify(stats.monthData))} options={chartOptions} />
        </div>
        <Show when={chatsData.length > 2}>
            <span><input type="checkbox" onChange={changeChart} /> Combine data</span>
        </Show>
    </Page>;
}