 /**
  * GmailLabel is a data-structure that holds an individual label
  */
 export class GmailLabel {
     id: string;
     labelListVisibility: string;
     messageListVisibility: string;
     name: string;
     type: string;
     suggested?: boolean;
     suggestedFor?: string;
     suggestedCount?: number;

     constructor(obj?: any) {
       this.id = obj && obj.id || null;
       this.labelListVisibility = obj && obj.labelListVisibility || null;
       this.messageListVisibility = obj && obj.messageListVisibility || null;
       this.name = obj && obj.name || null;
       this.type = obj && obj.type || null;
       this.suggested = obj && obj.suggested || false;
       this.suggestedFor = obj && obj.suggestedFor || null;
       this.suggestedCount = obj && obj.suggestedCount || null;
     }
 }
