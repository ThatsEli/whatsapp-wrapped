import { Show } from "solid-js";
import { LandingPage } from "../../pages/LandingPage";
import { MonthChartPage } from "../../pages/MonthChartPage";
import { UploadPage } from "../../pages/UploadPage";
import { chatData, loading } from "../../../store";
import { HourChartPage } from "../../pages/HourChartPage";
import { LengthChartPage } from "../../pages/LengthChart";
import { PerUserChartPage } from "../../pages/PerUserChartPage";
import { BasicStatsPage } from "../../pages/BasicStatsPage";


export function PageContainer() {
    return <div style={{height: '100vh', "overflow-y": 'scroll', "scroll-snap-type": 'y mandatory'}} >
        <LandingPage></LandingPage>
        <UploadPage></UploadPage>
        <Show when={chatData.messages.length > 0}>
            <BasicStatsPage></BasicStatsPage>
            <MonthChartPage></MonthChartPage>
            <HourChartPage></HourChartPage>
            <LengthChartPage></LengthChartPage>
            <PerUserChartPage></PerUserChartPage>
        </Show>
    </div>;
}