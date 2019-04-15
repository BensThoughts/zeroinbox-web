export interface ISender {
    senderId: string;
    fromAddress: string;
    fromName: string;
    count: number;
    totalSizeEstimate: number;
    sizeGroup: string;
    unsubscribeWeb: string;
    unsubscribeEmail: string;
}