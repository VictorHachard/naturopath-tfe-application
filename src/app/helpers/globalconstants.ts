export class Globalconstants{

 public static userInformation: any[];

  public static addUserInformation(id: number, usernameoremail: string): void{
    this.userInformation = [id, usernameoremail];
    console.log(this.userInformation);
  }
}
