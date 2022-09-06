import {Deserializable} from './deserializable.model';
import { User } from './user.model';

export class Client implements Deserializable {
    public id! : number;
    public organizationname!: string;
    public phone! :string;
    public logo! :string;
    public isActive! : boolean;
    public isSubscriptionActive!: boolean;
    public createdAt!:string;
    public creator!:User;

    deserialize(input: any): this {
        Object.assign(this, input);    
        this.creator = new User().deserialize(input.creator)
        return this;
    }

    getOrganizationName() {
        return this.organizationname;
    }

}
