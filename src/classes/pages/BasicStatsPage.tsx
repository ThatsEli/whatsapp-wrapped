import { stats } from "../../store";
import { Page } from "../components/pageProtofype/Page";
import './BasicStatsPage.css';

export function BasicStatsPage() {
    const busyDate = stats.busyDay?.date;

    return <Page>
        <h1>You have been busy texting!</h1>
        <h3>Here are some basic stats about your text messages:</h3>
        {/* <h3>
            <span class="stat" >{chatData.messages.length}</span> messages sent and received last year!
        </h3>
        <h2>
            {chatData.usernames[0] ?? 'You'} sent <span class="statAlt">{chatData.messages.filter(m => m.username === chatData.usernames[0]).length}</span> of them!
        </h2>
        <h2>
            {chatData.usernames[1] ?? '_'} sent the other <span class="statAlt">{chatData.messages.filter(m => m.username === chatData.usernames[1]).length}</span>!
        </h2>
        <h3>
            The busiest day was <span class="stat">{`${busyDate?.getDate()}.${busyDate?.getMonth()}.${busyDate?.getFullYear()}`}</span> 
            with <span class="statAlt">{stats.busyDay?.messageCount}</span> messages!
        </h3> */}
    </Page>;
}