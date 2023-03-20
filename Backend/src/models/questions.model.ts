export class Question {
 constructor(public Id: string, public Title: string,
   public Description: string, public Code: string, public userId: string, public tagName: string) { }
}


export interface DecodedData {
 Id: string,
 Title: string,
 Description: string,
 Code: string,
 userId: string,
tagName: string
}