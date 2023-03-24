export interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAdmin?: boolean;
  JWT: string;
}

export interface Login {
  email: string;
  password: string;
  JWT: string;
  isAdmin?: boolean;
}

export interface authResponseData{
  email:string,
  name:string,
  token:string,
  expiresIn:string
}

export interface IUserProfile {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

export interface Question {
  id: string,
  title: string,
  description: string,
  code: string,
  userId: string,
  tagName: string
}

export interface Message {
  message: string
}
