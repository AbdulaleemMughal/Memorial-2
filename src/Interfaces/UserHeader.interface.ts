import { Dayjs } from "dayjs";

export interface UserHeaderInterface {
    firstname: string;
    middlename: string;
    lastname: string;
    birthdate: Dayjs | null;
    expirydate: Dayjs | null;
    location: string;
};