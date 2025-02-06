export interface ApiResponseModel {
    status: string;
    data: Employee[];
}
export interface Employee{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    gender: string;
    education: string;
    company: string
    experience: number;
    package: number;
}
