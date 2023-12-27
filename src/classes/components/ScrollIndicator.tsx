import { scrollToElement } from "./pagePrototype/PageContainer";
import './ScrollIndicator.css';

export const ScrollIndicator = (props: { scrollLength: number }) => {
    return <img onclick={() => scrollToElement(window.innerHeight*props.scrollLength)} class="scrollDownIndicator" src="assets/arrow_scroll_down.svg" onClick={() => {}} />;
};
