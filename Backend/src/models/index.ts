export class User {
  constructor(public Id: string, public Name: string,
    public Email: string, public Password: string, public isAdmin: boolean) { }
}

export class Question {
 constructor(public id: string, public title: string,
  public description: string, public code: string, public userId: string, public tagName: string) { }
}

// export interface Question {
//   Id: string, Title: string,
//   Description: string, Code: string, userId: string, tagName: string

// }

export class Comment {
  constructor(public id: number, public comment: string, public userId: string, public answerId: string) { }
}

export class Answer {
  constructor(public id: number,
    public description: string, public code: string, public userId: string, public questionId: string) { }
}

export class question_votes {
  constructor(public id: number, public votes: BinaryType, public userId: string, public questionId: string) { }
}

export interface DecodedData {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}