import { Model, Optional, HasOne, HasOneCreateAssociationMixin, HasOneGetAssociationMixin } from "sequelize";

//DUkandar Attribute and Instance Types
interface DukandarAttributes {
    id: string;
    name: string;
    dob?: Date;
    phone_no: string;
    email_id: string;
    username: string;
    password: string;
}
interface DukandarCreationAttributes extends Optional<DukandarAttributes, "id"> {}
export interface DukandarInstance extends Model<DukandarAttributes, DukandarCreationAttributes>, DukandarAttributes {
    createAddress: HasOneCreateAssociationMixin<AddressAttributes>;
    getAddress: HasOneGetAssociationMixin<AddressInstance>;
}

//Grahak Attribute Types

interface GrahakAttributes {
    id: string;
    firstName: string;
    lastName: string;
    dob?: Date;
    phone_no: string;
    email_id: string;
    username: string;
    password: string;
}
interface GrahakCreationAttributes extends Optional<GrahakAttributes, "id"> {}
export interface GrahakInstance extends Model<GrahakAttributes, GrahakCreationAttributes>, GrahakAttributes {}

//Address Attribute Types;
interface AddressAttributes {
    city: string;
    state: string;
    country: string;
    zip_postcode: number;
    line_1: string;
    line_2: string;
}
interface AddressCreationAttributes extends Optional<AddressAttributes, "line_1"> {}

export interface AddressInstance extends Model<AddressAttributes, AddressCreationAttributes>, AddressAttributes {}