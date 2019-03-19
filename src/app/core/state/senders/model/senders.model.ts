export interface ISender {
    senderId: string;
    fromAddress: string;
    fromName: string;
    count: number;
    totalSizeEstimate: number;
    unsubscribeWeb: string;
    unsubscribeEmail: string;
}