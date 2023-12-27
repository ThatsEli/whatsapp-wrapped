import { Chart, registerables } from "chart.js";
import { Bar } from "solid-chartjs";
import { onMount } from "solid-js";
import { chartOptions } from "../../App";
import { hourlyChartData, stats } from "../../store";
import { Page } from "../components/pageProtofype/Page";

export function HourChartPage() {
    onMount(() => {
        Chart.register(...registerables);
    });
    return <Page>
        <h1>Hour Chart</h1>
        <div style={{ width: '80vw', height: '60vh' }} >
            <Bar data={JSON.parse(JSON.stringify(stats.hourData))} options={chartOptions} />
        </div>
    </Page>;
}