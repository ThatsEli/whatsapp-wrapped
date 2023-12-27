import { DefaultChart } from "solid-chartjs";
import { chartOptions } from "../../App";
import { lengthChartData } from "../../store";
import { Page } from "../components/pageProtofype/Page";

export function LengthChartPage() {
    return <Page>
        <h1>Length Chart</h1>
        <div style={{width: '80vw', height: '60vh'}} >
            <DefaultChart type="bar" data={JSON.parse(JSON.stringify(lengthChartData.data))} options={chartOptions} />
        </div>
    </Page>;
}