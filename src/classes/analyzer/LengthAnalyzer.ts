import { ChatData, ParsedMessage } from "../ChatParser";

const compactFactor = 10;

export function analyzeLength(chatData: ChatData): LengthData {
    const lengths: LengthData = {
        lengths: [],
    };
    chatData.messages.forEach((message: ParsedMessage) => {
        const length = Math.floor(message.message.length / compactFactor);
        if(lengths.lengths[length]) {
            lengths.lengths[length].count++;
        } else {
            lengths.lengths[length] = {
                length: length * compactFactor,
                count: 1,
            };
        }
    });
    // filter out max elements if they are too far away from the rest
    const max = Math.max(...lengths.lengths.map(l => l.count));
    const avg = lengths.lengths.reduce((sum, l) => sum + l.count, 0) / lengths.lengths.length;
    const filtered = lengths.lengths.filter(l => l.count > avg / 3 || l.count === max);
    lengths.lengths = filtered;
    return lengths;
}

export interface LengthData {
    lengths: {
        length: number,
        count: number,
    }[]
}