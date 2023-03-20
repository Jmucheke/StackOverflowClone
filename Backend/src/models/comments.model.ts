export class Comment {
 constructor(public Id: number, public Comment: string, public userId: string, public answerId: string) { }
}


export interface DecodedData {
 Id: number,
 Comment: string,
 userId: string,
 answerId: string
}