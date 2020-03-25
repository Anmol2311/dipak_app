// api url
export const baseURL = "http://localhost:8888/api";
export const users = "users";
export const students = "students";
export const exams = "exams";
export const questions = "questions";
export const vouchers = "vouchers";
export const result = "result";
export const codePrefix = "HI";

// radio & dropdown options
export const gender = ['male', 'female', 'other'];
export const roles = ['admin', 'trainer','counselor','executive'];
export const answers = ['a','b','c','d'];
export const branches = ['aundh','hadapsar','yerwada','warje','bibvewadi','bhavanipeth'];
export const organizations = ['hematite','lighthouse','cdac'];

// Regex for validation
export const nameRegex = /^[a-zA-Z]+$/;
export const emailRegex = /^\w+[\w-\.0-9]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,30}$/;
export const contactRegex = /^\d{10}$/;
export const examNameRegex = /^[a-zA-Z][a-zA-Z\:\- ]+$/;
export const options = /^[a-zA-Z0-9]+$/;
export const pnrNo = /^[0-9]+$/;
export const voucher = /^[A-Za-z0-9]{6,6}$/;

// error messages
export const requiredError = "This field is required";
export const nameError = "Not a valid name";
export const emailError = "Not a valid email address";
export const passwordError = "Not a valid password";
export const contactError = "Not a valid mobile number";
export const examNameError = "Not a valid exam name";
export const pnrNoError = "Not a valid PNR number";
export const voucherError = "Not a valid voucher";

