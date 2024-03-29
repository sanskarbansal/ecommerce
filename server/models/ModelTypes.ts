import {
    Model,
    Optional,
    HasOneCreateAssociationMixin,
    HasOneGetAssociationMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    ManyToManyOptions,
    HasManyAddAssociationMixinOptions,
    BelongsToManyAddAssociationMixin,
} from "sequelize";

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
    createProduct: HasManyCreateAssociationMixin<ProductInstance>;
    getProducts: HasManyGetAssociationsMixin<ProductInstance>;
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
    Address?: AddressAttributes;
}
interface GrahakCreationAttributes extends Optional<GrahakAttributes, "id"> {}
export interface GrahakInstance extends Model<GrahakAttributes, GrahakCreationAttributes>, GrahakAttributes {
    getAddress: HasManyGetAssociationsMixin<AddressInstance>;
    createAddress: HasManyCreateAssociationMixin<AddressInstance>;
    createCart: HasOneCreateAssociationMixin<CartInstance>;
    getCart: HasOneGetAssociationMixin<any>;
}

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

//Product Types
interface ProductAttributes {
    id: string;
    name: string;
    description?: Date;
    price: number;
    mrp: number;
    imageName: string;
    DukandarId?: string;
    inStock: number;
}
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}
export interface ProductInstance extends Model<ProductAttributes, ProductCreationAttributes>, ProductAttributes {
    getDukandar: HasOneGetAssociationMixin<DukandarInstance>;
    getProductFeature: HasManyGetAssociationsMixin<ProductFeatureInstance>;
    createProductFeature: HasManyCreateAssociationMixin<ProductFeatureInstance>;
}

//Feature Types of Products
interface ProductFeatures {
    name: string;
    description?: Date;
}
// interface ProductFeatureCreationAttributes extends Optional<ProductFeatures, " "> {}
export interface ProductFeatureInstance extends Model<ProductFeatures>, ProductAttributes {
    // getDukandar: HasOneGetAssociationMixin<DukandarInstance>;
}

//DUkandar Attribute and Instance Types
interface CartAttributes {
    id: string;
}
interface CartCreationAttributes extends Optional<CartAttributes, "id"> {}
export interface CartInstance extends Model<CartAttributes, CartCreationAttributes>, CartAttributes {
    addProduct: BelongsToManyAddAssociationMixin<ProductInstance, any>;
    getProducts: HasManyGetAssociationsMixin<ProductInstance>;
}
