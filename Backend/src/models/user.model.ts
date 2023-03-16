export class User {
 constructor(public Id: string, public Name: string,
  public Email: string, public Password: string, public isAdmin: boolean) { }
}


export interface DecodedData {
 Id: string,
 Name: string,
 Email: string,
 isDeleted?: boolean;
 isAdmin: boolean;
}