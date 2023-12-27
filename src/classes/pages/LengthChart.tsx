import { Chart, registerables } from "chart.js";
import { Bar } from "solid-chartjs";
import { onMount } from "solid-js";
import { chartOptions } from "../../App";
import { stats } from "../../store";
import { Page } from "../components/pageProtofype/Page";

export function LengthChartPage() {
    onMount(() => {
        Chart.register(...registerables);
    });
    return <Page>
        <h1>Length Chart</h1>
        <div style={{width: '80vw', height: '60vh'}} >
            <Bar data={JSON.parse(JSON.stringify(stats.lengthData))} options={chartOptions} />
        </div>
    </Page>;
}