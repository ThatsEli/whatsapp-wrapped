import { ScrollIndicator } from "../components/Scrollindicator";
import { Page } from "../components/pagePrototype/Page";
import './LandingPage.css';

export function LandingPage() {
    return <Page>
        <h2 class="welcomeHeader">Welcome 👋</h2>
        <span class="welcomeText">This is a tool to analyze your WhatsApp chat history. Upload your chat history and get some insights!</span>
        <span class="scrollDownText" >Scroll down to get started!</span>
        <ScrollIndicator scrollLength={1} />
    </Page>;
}
