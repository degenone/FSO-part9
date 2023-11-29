import { Gender, NewPatient } from './types';

const isString = (str: unknown): str is string =>
    typeof str === 'string' || str instanceof String;

const parseName = (name: unknown): string => {
    if (!name || !isString(name))
        throw new Error(`Unable to parse name: ${name}`);
    return name;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDateOfBirth = (dob: unknown): string => {
    if (!dob || !isString(dob) || !isDate(dob))
        throw new Error(`Unable to parse dateOfBirth: ${dob}`);
    return dob;
};

const isSsn = (ssn: string): boolean =>
    /\d{6}[-+A]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]/.test(ssn);

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn))
        throw new Error(`Unable to parse ssn: ${ssn}`);
    return ssn;
};

const isGender = (gender: string): gender is Gender =>
    Object.values(Gender)
        .map((g) => g.toString())
        .includes(gender);

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender))
        throw new Error(`Unable to parse gender: ${gender}`);
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation))
        throw new Error(`Unable to parse occupation: ${occupation}`);
    return occupation;
};

const ssnAndDoBMatch = (ssn: string, dob: string): boolean => {
    const year = `${
        ssn[6] === '+' ? '18' : ssn[6] === '-' ? '19' : '20'
    }${ssn.slice(4, 6)}`;
    const month = ssn.slice(2, 4);
    const day = ssn.slice(0, 2);
    return Date.parse(`${year}-${month}-${day}`) === Date.parse(dob);
};

const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Unable to parse patient data');
    }
    if (!('name' in object)) throw new Error("Missing field 'name'");
    if (!('dateOfBirth' in object))
        throw new Error("Missing field 'dateOfBirth'");
    if (!('ssn' in object)) throw new Error("Missing field 'ssn'");
    if (!('gender' in object)) throw new Error("Missing field 'gender'");
    if (!('occupation' in object))
        throw new Error("Missing field 'occupation'");
    const dateOfBirth = parseDateOfBirth(object.dateOfBirth);
    const ssn = parseSsn(object.ssn);
    if (!ssnAndDoBMatch(ssn, dateOfBirth))
        throw new Error(`Ssn and date of birth do not match.`);
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth,
        ssn,
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
    };
    return newPatient;
};

export default toNewPatient;
