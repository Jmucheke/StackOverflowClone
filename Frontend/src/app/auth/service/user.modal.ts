export class User{
  constructor(
    private name: string,
    private email: string,
    private token: string,
    private expirationDate: Date){}

  get expireDate() {
    return this.expirationDate;
  }
}