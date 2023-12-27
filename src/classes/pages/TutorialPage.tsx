import { CurrentPageSet, setCurrentPageSet } from "../../store";
import { Page } from "../components/pagePrototype/Page";
import { scrollToElement } from "../components/pagePrototype/PageContainer";

export function TutorialPage() {
    return <Page>
        <h1>Tutorial</h1>
        <h3>iOS:</h3>
        <span>
            WhatsApp -&gt; Settings -&gt; Chat -&gt; Chat Export -&gt; Export without media
        </span>
        <h3>Android:</h3>
        <span>
            WhatsApp -&gt; Settings -&gt; Chat -&gt; Chat History -&gt; Export Chat -&gt; Without media
        </span>
        <p>
            Then upload zip file here.
        </p>
        <button onClick={() => {
            setTimeout(() => {
                scrollToElement(2000, false);
            }, 0);
            setCurrentPageSet({ current: CurrentPageSet.Main });
        }} >Back</button>
    </Page>
}
