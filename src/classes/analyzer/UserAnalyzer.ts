import { ChatData, ParsedMessage } from "../ChatParser";

export function analyzeUsers(chatData: ChatData): UserData {
    const users: UserData = {
        users: [],
    };
    chatData.messages.forEach((message: ParsedMessage) => {
        if(!users.users.find((user) => user.name == message.username)) {
            users.users.push({
                name: message.username,
                count: 0,
            });
        }
        users.users.find((user) => user.name == message.username)!.count++;
    });
    return users;
}

export interface UserData {
    users: {
        name: string,
        count: number,
    }[]
}