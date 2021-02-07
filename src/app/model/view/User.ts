export class User {
  constructor( public token: string,
               public username: string,
               public roleList: string[],
               public dark: boolean) {
  }
}
