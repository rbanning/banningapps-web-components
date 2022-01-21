export class User {
  constructor(
    public name: string = "no name",
    public age: number = 0
  ) {}

  hello(): string {
    return `Hi ${this.name}!  You are looking good for being ${this.age} years old`;
  }
}