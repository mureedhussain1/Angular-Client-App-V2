import {Deserializable} from './deserializable.model';

export class SystemRoles implements Deserializable {
  public title!: string;
  public description!: string;
  public id!: number;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
  
  getRoleId() {
    return this.id;
  }
}