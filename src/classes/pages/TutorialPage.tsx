import { CurrentPageSet, setCurrentPageSet } from "../../store";
import { Page } from "../components/pagePrototype/Page";
import { scrollToElement } from "../components/pagePrototype/PageContainer";
import './TutorialPage.css';

export function TutorialPage() {
    return <Page>
        <h1>Tutorial</h1>
        <span>You need to export every chat you want to analyse manually from WhatsApp.
            You can analyse only one or multiple chats at once! </span>
        <h3>iOS:</h3>
        <span>
            WhatsApp -&gt; Settings -&gt; Chat -&gt; Chat Export -&gt; Export without media
        </span>
        <h3>Android:</h3>
        <span>
            WhatsApp -&gt; Settings -&gt; Chat -&gt; Chat History -&gt; Export Chat -&gt; Without media
        </span>
        <span>Save the Zip files in a known location e.g. download folder.</span>
        <p>
            Then upload zip file(s) here.
        </p>
        <button onClick={() => {
            setTimeout(() => {
                scrollToElement(2000, false);
            }, 0);
            setCurrentPageSet({ current: CurrentPageSet.Main });
        }} >Back</button>
    </Page>
}
