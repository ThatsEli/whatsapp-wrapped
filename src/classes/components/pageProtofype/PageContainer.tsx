import { Page } from "./page";

export function PageContainer() {
    return <div style={{height: '100vh', "overflow-y": 'scroll', "scroll-snap-type": 'y mandatory'}} >
        <Page></Page>
        <Page></Page>
        <Page></Page>
    </div>;
}