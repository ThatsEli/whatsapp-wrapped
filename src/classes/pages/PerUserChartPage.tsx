import { Chart, registerables } from "chart.js";
import { Pie } from "solid-chartjs";
import { onMount } from "solid-js";
import { chartOptions } from "../../App";
import { stats } from "../../store";
import { Page } from "../components/pagePrototype/Page";

export function PerUserChartPage() {
    onMount(() => {
        Chart.register(...registerables);
    });
    return <Page>
        <h1>User Chart</h1>
        <div style={{ width: '80vw', height: '60vh' }} >
            <Pie data={JSON.parse(JSON.stringify(stats.userData))} options={{...chartOptions, plugins: { legend: { display: false } }}} />
        </div>
    </Page>;
}