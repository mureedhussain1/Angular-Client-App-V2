import {Deserializable} from './deserializable.model';
import {Client} from './client.model';

export class User implements Deserializable {
    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public phone!: string;
    public isActive!: string;
    public isVerified!: string;
    public createdAt!: string;
    public submittedby!: User;
    public client!: Client;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.client = new Client().deserialize(input.client);
    this.submittedby = new User().deserialize(input.submittedby);
    return this;
  }
  
  getFullName() {
    return this.firstname + ' ' + this.lastname;
  }
}