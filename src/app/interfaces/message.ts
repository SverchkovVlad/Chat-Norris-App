export interface Conversation {
    nickname: string,
    latestMessageRead: boolean,
    conversationID: number,
    avatar: string,
    messages: Message[]
}

export interface Message {
    messageID: number,
    text: string,
    time: Date | string,
    me: boolean    
}

export interface IncomingMessage {
    conversationID: number,
    incomingMessage: Message
}