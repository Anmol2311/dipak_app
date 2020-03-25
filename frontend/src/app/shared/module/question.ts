export class Question {
    id?: number;
    examCode: number | string;
    question: string;
    a: any;
    b: any;
    c: any;
    d: any;
    answer: string;
    selected?: string;
}