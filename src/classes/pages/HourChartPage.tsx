import { DefaultChart } from "solid-chartjs";
import { Page } from "../components/pageProtofype/Page";
import { hourlyChartData } from "../../store";
import { chartOptions } from "../../App";

export function HourChartPage() {
    return <Page>
        <h1>Hour Chart</h1>
        <div style={{width: '80vw', height: '60vh'}} >
            <DefaultChart type="bar" data={JSON.parse(JSON.stringify(hourlyChartData.data))} options={chartOptions} />
        </div>
    </Page>;
}