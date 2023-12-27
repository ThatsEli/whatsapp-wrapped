import { DefaultChart } from "solid-chartjs";
import { Page } from "../components/pageProtofype/Page";
import { monthChartData } from "../../store";
import { chartOptions } from "../../App";

export function MonthChartPage() {
    return <Page>
        <h1>Month Chart</h1>
        <div style={{width: '80vw', height: '60vh'}} >
            <DefaultChart type="bar" data={JSON.parse(JSON.stringify(monthChartData.data))} options={chartOptions} />
        </div>
    </Page>;
}