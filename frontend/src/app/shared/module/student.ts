export class Student {
    id: number;
    fname: string;
    lname: string;
    email: string;
    dob: string;
    contact: number;
    gender: string;
    organization: string;
    branch: string | null;
    pnrNo: number | null;
}

export class StudentLogin {
    email: string;
    dob: string;
}