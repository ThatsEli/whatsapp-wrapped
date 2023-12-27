import { chatsData, stats } from "../../store";
import { Page } from "../components/pagePrototype/Page";
import './BasicStatsPage.css';

export function BasicStatsPage() {
    return <Page>
        <h1>You have been busy texting!</h1>
        <h3>Here are some basic stats about your text messages:</h3>
        <span class="infoBlock" >
            Over the last 365 days <span class="stat" >{chatsData[0].messages.length}</span> messages have been sent and received.
        </span>
        <span class="infoBlock" >
            {chatsData[0].usernames[0] ?? 'You'} sent <span class="statAlt">{chatsData[0].messages.filter(m => m.username === chatsData[0].usernames[0]).length}</span> of them!
        </span>
        <span class="infoBlock" >
            {chatsData[0].usernames[1] ?? '_'} the other <span class="statAlt">{chatsData[0].messages.filter(m => m.username === chatsData[0].usernames[1]).length}</span>!
        </span>
        <h3>
            The busiest day was <span class="stat">{`${(new Date(stats.busyDay.date.toString())).getDate()}.${(new Date(stats.busyDay.date.toString())).getMonth()}.${(new Date(stats.busyDay.date.toString())).getFullYear()}`}</span>
            with <span class="statAlt">{stats.busyDay.messageCount}</span> messages!
        </h3>
    </Page>;
}