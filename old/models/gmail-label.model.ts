 /**
  * GmailLabel is a data-structure that holds an individual label
  */
 export class GmailLabel {
     id: string;
     labelListVisibility: string;
     messageListVisibility: string;
     name: string;
     type: string;
     senders?: boolean;
     sendersFor?: string;
     sendersCount?: number;

     constructor(obj?: any) {
       this.id = obj && obj.id || null;
       this.labelListVisibility = obj && obj.labelListVisibility || null;
       this.messageListVisibility = obj && obj.messageListVisibility || null;
       this.name = obj && obj.name || null;
       this.type = obj && obj.type || null;
       this.senders = obj && obj.senders || false;
       this.sendersFor = obj && obj.sendersFor || null;
       this.sendersCount = obj && obj.sendersCount || null;
     }
 }
