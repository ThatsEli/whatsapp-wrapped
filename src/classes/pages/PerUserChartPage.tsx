import { DefaultChart } from "solid-chartjs";
import { chartOptions } from "../../App";
import { ChatData } from "../ChatParser";
import { Page } from "../components/pageProtofype/Page";
import { chatData } from "../../store";

export function PerUserChartPage() {

    let localChatData = (): ChatData => {
        return JSON.parse(JSON.stringify(chatData));
    }
    
    return <Page>
        <h1>User Chart</h1>
        <div style={{width: '80vw', height: '60vh'}} >
        <DefaultChart type='pie' data={{ labels: localChatData().usernames, datasets: [{ label: 'Messages', data: localChatData().usernames.map(u => localChatData().messages.filter(m => m.username === u).length), backgroundColor: 'rgba(255, 99, 132, 0.8)' }] }} options={chartOptions} />
        </div>
    </Page>;
}