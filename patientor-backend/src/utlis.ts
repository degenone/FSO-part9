import {
    Diagnosis,
    Discharge,
    EntryBaseNoId,
    Gender,
    NewEntry,
    NewPatient,
    SickLeave,
} from './types';

const isString = (str: unknown): str is string =>
    typeof str === 'string' || str instanceof String;

const parseString = (str: unknown, paramName: string): string => {
    if (!str || !isString(str))
        throw new Error(`Unable to parse ${paramName}: ${str}`);
    return str;
};

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const parseDate = (date: unknown, paramName: string): string => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error(`Unable to parse ${paramName}: ${date}`);
    return date;
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

const ssnAndDoBMatch = (ssn: string, dob: string): boolean => {
    const year = `${
        ssn[6] === '+' ? '18' : ssn[6] === '-' ? '19' : '20'
    }${ssn.slice(4, 6)}`;
    const month = ssn.slice(2, 4);
    const day = ssn.slice(0, 2);
    return Date.parse(`${year}-${month}-${day}`) === Date.parse(dob);
};

export const toNewPatient = (object: unknown): NewPatient => {
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
    const dateOfBirth = parseDate(object.dateOfBirth, 'dateOfBirth');
    const ssn = parseSsn(object.ssn);
    if (!ssnAndDoBMatch(ssn, dateOfBirth))
        throw new Error(`Ssn and date of birth do not match.`);
    const newPatient: NewPatient = {
        name: parseString(object.name, 'name'),
        dateOfBirth,
        ssn,
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation, 'occupation'),
        entries: [],
    };
    return newPatient;
};

const isNumber = (num: unknown): num is number => !isNaN(Number(num));

const isHealthCheckRating = (rating: number): boolean =>
    rating === 0 || rating === 1 || rating === 2 || rating === 3;

const parseHealthCheckRating = (rating: unknown): number => {
    if (!isNumber(rating) || !isHealthCheckRating(rating))
        throw new Error(`Unable to parse rating: ${rating}`);
    return rating;
};

type EntryType = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

const isEntryType = (type: string): type is EntryType =>
    type === 'HealthCheck' ||
    type === 'Hospital' ||
    type === 'OccupationalHealthcare';

const parseType = (type: unknown): EntryType => {
    if (!type || !isString(type) || !isEntryType(type))
        throw new Error(`Unable to parse type: ${type}`);
    return type;
};

const parseDischarge = (discharge: unknown): Discharge => {
    if (
        !discharge ||
        typeof discharge !== 'object' ||
        !('date' in discharge) ||
        !('criteria' in discharge)
    ) {
        throw new Error(`Unable to parse discharge: ${discharge}`);
    }
    return {
        date: parseDate(discharge.date, 'discharge date'),
        criteria: parseString(discharge.criteria, 'discharge criteria'),
    };
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
    if (
        !sickLeave ||
        typeof sickLeave !== 'object' ||
        !('startDate' in sickLeave) ||
        !('endDate' in sickLeave)
    ) {
        throw new Error(`Unable to parse sickLeave: ${sickLeave}`);
    }
    return {
        startDate: parseDate(sickLeave.startDate, 'sick leave start date'),
        endDate: parseDate(sickLeave.endDate, 'sick leave end date'),
    };
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (
        !object ||
        typeof object !== 'object' ||
        !('diagnosisCodes' in object)
    ) {
        return [] as Array<Diagnosis['code']>;
    }
    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Unable to parse patient data');
    }
    if (!('type' in object)) throw new Error("Missing field 'type'");
    switch (parseType(object.type)) {
        case 'HealthCheck':
            return toNewHealthCheckEntry(object);
        case 'Hospital':
            return toNewHospitalEntry(object);
        case 'OccupationalHealthcare':
            return toNewOccupationalHealthcareEntry(object);
        default:
            throw new Error(`Unknown type: ${object.type}`);
    }
};

const getEntryBaseParams = (object: object): EntryBaseNoId => {
    if (!('description' in object))
        throw new Error("Missing field 'description'");
    if (!('date' in object)) throw new Error("Missing field 'date'");
    if (!('specialist' in object))
        throw new Error("Missing field 'specialist'");
    return {
        description: parseString(object.description, 'description'),
        date: parseDate(object.date, 'date'),
        specialist: parseString(object.specialist, 'specialist'),
        diagnosisCodes: parseDiagnosisCodes(object),
    };
};

const toNewHealthCheckEntry = (object: object): NewEntry => {
    if (!('healthCheckRating' in object))
        throw new Error("Missing field 'healthCheckRating'");
    const { description, date, specialist, diagnosisCodes } =
        getEntryBaseParams(object);
    return {
        description,
        date,
        specialist,
        type: 'HealthCheck',
        diagnosisCodes,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
    };
};

const toNewHospitalEntry = (object: object): NewEntry => {
    if (!('discharge' in object)) throw new Error("Missing field 'discharge'");
    const discharge = parseDischarge(object.discharge);
    const { description, date, specialist, diagnosisCodes } =
        getEntryBaseParams(object);
    const newEntry: NewEntry = {
        description,
        date,
        specialist,
        type: 'Hospital',
        diagnosisCodes,
        discharge,
    };
    if ('healthCheckRating' in object) {
        newEntry.healthCheckRating = parseHealthCheckRating(
            object.healthCheckRating
        );
    }
    return newEntry;
};

const toNewOccupationalHealthcareEntry = (object: object): NewEntry => {
    if (!('employerName' in object))
        throw new Error("Missing field 'employerName'");
    const employerName = parseString(object.employerName, 'employerName');
    const { description, date, specialist, diagnosisCodes } =
        getEntryBaseParams(object);
    const newEntry: NewEntry = {
        description,
        date,
        specialist,
        type: 'OccupationalHealthcare',
        diagnosisCodes,
        employerName,
    };
    if ('sickLeave' in object) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
    }
    if ('healthCheckRating' in object) {
        newEntry.healthCheckRating = parseHealthCheckRating(
            object.healthCheckRating
        );
    }
    return newEntry;
};
