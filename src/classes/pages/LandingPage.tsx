import { ScrollIndicator } from "../components/ScrollIndicator";
import { Page } from "../components/pagePrototype/Page";
import './LandingPage.css';

export function LandingPage() {
    return <Page>
        <h2 class="welcomeHeader">Welcome 👋</h2>
        <span class="welcomeText">This is a tool to analyze your WhatsApp chat history. Import your chat history and get some interesting insights.</span>
        <span class="welcomeText">No data ever leaves your device! You can turn off the internet connection at any time.</span>
        {/* <span class="scrollDownText" >Scroll down to get started!</span> */}
        <ScrollIndicator scrollLength={1} />
    </Page>;
}
