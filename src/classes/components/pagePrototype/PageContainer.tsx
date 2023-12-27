import { Match, Show, Switch, createSignal, onCleanup, onMount } from "solid-js";
import { CurrentPageSet, chatsData, currentPageSet } from "../../../store";
import { HourChartPage } from "../../pages/HourChartPage";
import { LandingPage } from "../../pages/LandingPage";
import { LengthChartPage } from "../../pages/LengthChart";
import { MonthChartPage } from "../../pages/MonthChartPage";
import { TutorialPage } from "../../pages/TutorialPage";
import { UploadPage } from "../../pages/UploadPage";
import './Page.css';
import { PerUserChartPage } from "../../pages/PerUserChartPage";
import { BasicStatsPage } from "../../pages/BasicStatsPage";


export function PageContainer() {
    const [scrolledDown, setScrolledDown] = createSignal(false);

    onMount(() => {
        const interval = setInterval(() => {
            const scrollContainer = document.getElementById('pageMotherContainer');
            if (scrollContainer) {
                const scrollDown = scrollContainer.scrollTop > 100;
                setScrolledDown(scrollDown);
            }
        }, 500);

        onCleanup(() => {
            clearInterval(interval);
        });
    });
    

    return <div id="pageMotherContainer" style={{height: '100vh', "overflow-y": 'scroll', "scroll-snap-type": 'y mandatory'}} >
        <div style={{opacity: (currentPageSet.current == CurrentPageSet.Main && scrolledDown() ? 1 : 0), transition: '300ms' }} onClick={() => { scrollToElement(-100); setScrolledDown(false); }} class="backButton" >
            <img class="backSvg" src="assets/arrow_up.svg" />
        </div>
        <Switch fallback={<div>Loading...</div>}>
            <Match when={currentPageSet.current == CurrentPageSet.Main}>
                <LandingPage></LandingPage>
                <UploadPage></UploadPage>
                <Show when={chatsData.length > 0}>
                    <Show when={chatsData.length == 1}>
                        <BasicStatsPage></BasicStatsPage>
                    </Show>
                    <MonthChartPage></MonthChartPage>
                    <HourChartPage></HourChartPage>
                    <LengthChartPage></LengthChartPage>
                    <PerUserChartPage></PerUserChartPage>
                </Show>
            </Match>
            <Match when={currentPageSet.current == CurrentPageSet.Tutorial}>
                <TutorialPage></TutorialPage>
            </Match>
        </Switch>
    </div>;
}

export function scrollToElement(offset = 0, smooth = true) {
    const scrollContainer = document.getElementById('pageMotherContainer');

    if (scrollContainer) {
        scrollContainer.scrollTo({
            top: offset,
            behavior: smooth ? 'smooth' : 'instant'
        });
    }
}