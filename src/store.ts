import { createStore } from "solid-js/store";
import { ChatData } from "./classes/ChatParser";
import { ChartProps } from "solid-chartjs";

export const enum CurrentPageSet {
    Main,
    Tutorial,
}

export const getEmptyStatData = (): StatData => JSON.parse(JSON.stringify(emptyStatData));

const emptyStatData: StatData = {
    monthData: { labels: [], datasets: [] },
    dayData: { labels: [], datasets: [] },
    hourData: { labels: [], datasets: [] },
    lengthData: { labels: [], datasets: [] },
    userData: { labels: [], datasets: [] },
    busyDay: { date: new Date(Date.now()), messageCount: 0 },
};

export const [chatsData, setChatsData] = createStore<ChatData[]>([]);
export const [loading, setLoading] = createStore<{ state: boolean }>({ state: false });

export const [stats, setStats] = createStore<StatData>(getEmptyStatData());

export const [currentPageSet, setCurrentPageSet] = createStore<{ current: CurrentPageSet }>({ current: CurrentPageSet.Main });

export interface StatData {
    monthData: ChartProps["data"];
    dayData: ChartProps["data"];
    hourData: ChartProps["data"];
    lengthData: ChartProps["data"];
    userData?: ChartProps["data"];
    busyDay: { date: Date, messageCount: number };
}