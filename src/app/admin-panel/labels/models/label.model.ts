/**
 *  Provides a `Label` object
 */
 export class Label {
   constructor(
     public id: string,    // The labels ID
     public name: string,  // The name visible in the inbox
     public type: string,  // if the label is a 'user' label or 'system'
   ) {}
 }

 /**
  * Label is a data-structure that holds an individual label
  */
 export class LabelResult {
     id: string;
     name: string;
     type: string;

     constructor(obj?: any) {
       this.id = obj && obj.id || null;
       this.name = obj && obj.name || null;
       this.type = obj && obj.type || null;
     }
 }
