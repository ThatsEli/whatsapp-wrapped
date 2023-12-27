import { createStore } from "solid-js/store";
import { ChatData } from "./classes/ChatParser";
import { ChartProps } from "solid-chartjs";

export enum CurrentPageSet {
    Main,
    Tutorial,
}

export const [chatData, setChatData] = createStore<ChatData>({ messages: [], usernames: [] });
export const [loading, setLoading] = createStore<{ state: boolean }>({ state: false });
// export const [monthChartData, setMonthChartData] = createStore<ChartProps["data"]>({ labels: [], datasets: [] });
export const [monthChartData, setMonthChartData] = createStore<{ data: ChartProps["data"] }>({ data: { labels: [], datasets: [] } });
// export const [hourlyChartData, setHourlyChartData] = createStore<ChartProps["data"]>({ labels: [], datasets: [] });
export const [hourlyChartData, setHourlyChartData] = createStore<{ data: ChartProps["data"] }>({ data: { labels: [], datasets: [] } });
// export const [lengthChartData, setLengthChartData] = createStore<ChartProps["data"]>({ labels: [], datasets: [] });
export const [lengthChartData, setLengthChartData] = createStore<{ data: ChartProps["data"] }>({ data: { labels: [], datasets: [] } });
// export const [dayChartData, setDayChartData] = createStore<ChartProps["data"]>({ labels: [], datasets: [] });
export const [dayChartData, setDayChartData] = createStore<{ data: ChartProps["data"] }>({ data: { labels: [], datasets: [] } });

export const [stats, setStats] = createStore<{ busyDay?: { date: Date, messageCount: number } }>({});

export const [currentPageSet, setCurrentPageSet] = createStore<{ current: CurrentPageSet }>({ current: CurrentPageSet.Main });
