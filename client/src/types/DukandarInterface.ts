export default interface DukandarInterface {
    name: string;
    dob?: Date | null;
    username: string;
    password: string;
    email_id: string;
    phone_no: string;
    city: string;
    state: string;
    zip_postcode: number;
    country: string;
    line_1: string;
    line_2?: string;
}
