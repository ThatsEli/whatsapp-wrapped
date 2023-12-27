import { CurrentPageSet, setCurrentPageSet } from "../../store";
import { Page } from "../components/pageProtofype/Page";
import { scrollToElement } from "../components/pageProtofype/PageContainer";

export function TutorialPage() {
    return <Page>
        <h1>Tutorial</h1>
        <h3>iOS:</h3>
        <span>
            WhatsApp -> Settings -> Chat -> Chat Export -> Export without media
        </span>
        <h3>Android:</h3>
        <span>
            WhatsApp -> Settings -> Chat -> Chat History -> Export Chat -> Without media
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
