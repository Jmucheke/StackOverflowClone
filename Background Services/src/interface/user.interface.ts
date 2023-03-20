export interface User{
 id: string,
 name: string,
 email: string,
 password:string;
 isDeleted?: boolean;
 isAdmin: boolean;
 isSent:string
}