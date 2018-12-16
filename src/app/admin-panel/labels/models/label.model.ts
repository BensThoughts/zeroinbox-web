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
