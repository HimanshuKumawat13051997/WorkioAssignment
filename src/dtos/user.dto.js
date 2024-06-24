export class UserDTO {
  constructor({ id, email, name, age, city, zipCode, Token }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.age = age;
    this.city = city;
    this.zipCode = zipCode;
    this.Token = Token;
  }
}
