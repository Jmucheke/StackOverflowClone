export class Answer {
 constructor(public Id: number, public Title: string,
  public Description: string, public Code: string, public userId: string, public questionId:string) { }
}


export interface DecodedData {
 Id: number,
 Title: string,
 Description: string,
 Code: string,
 userId: string,
 questionId: string
}