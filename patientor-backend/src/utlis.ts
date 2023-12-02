import {
    Diagnosis,
    Discharge,
    Gender,
    NewEntry,
    NewPatient,
    SickLeave,
} from './types';

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
        entries: [],
    };
    return newPatient;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description))
        throw new Error(`Unable to parse description: ${description}`);
    return description;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error(`Unable to parse date: ${date}`);
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist))
        throw new Error(`Unable to parse specialist: ${specialist}`);
    return specialist;
};

const isNumber = (num: string): boolean => !isNaN(+num);

const parseHealthCheckRating = (rating: unknown): number => {
    if (!rating || !isString(rating) || !isNumber(rating))
        throw new Error(`Unable to parse rating: ${rating}`);
    return Number(rating);
};

const isEntryType = (type: string): boolean =>
    ['HealthCheck', 'Hospital', 'OccupationalHealthcare'].includes(type);

const parseType = (
    type: unknown
): 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare' => {
    if (!type || !isString(type) || !isEntryType(type))
        throw new Error(`Unable to parse type: ${type}`);
    return type as 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
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
    if (!isString(discharge.date) || !isDate(discharge.date))
        throw new Error(`Unable to parse discharge date: ${discharge.date}`);
    if (!isString(discharge.criteria))
        throw new Error(
            `Unable to parse discharge criteria: ${discharge.criteria}`
        );
    return {
        date: discharge.date,
        criteria: discharge.criteria,
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
    if (!isString(sickLeave.startDate) || !isDate(sickLeave.startDate))
        throw new Error(
            `Unable to parse sickLeave start date: ${sickLeave.startDate}`
        );
    if (!isString(sickLeave.endDate) || !isDate(sickLeave.endDate))
        throw new Error(
            `Unable to parse sickLeave end date: ${sickLeave.endDate}`
        );
    return {
        startDate: sickLeave.startDate,
        endDate: sickLeave.endDate,
    };
};

const parseEmployerName = (employerName: unknown): string => {
    if (!employerName || !isString(employerName))
        throw new Error(`Unable to parse employer name: ${employerName}`);
    return employerName;
};

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Unable to parse patient data');
    }
    if (!('type' in object)) throw new Error("Missing field 'type'");
    if (!('description' in object))
        throw new Error("Missing field 'description'");
    if (!('date' in object)) throw new Error("Missing field 'date'");
    if (!('specialist' in object))
        throw new Error("Missing field 'specialist'");
    const newEntry: NewEntry = {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        type: parseType(object.type),
    };
    if ('diagnosisCodes' in object) {
        newEntry.diagnosisCodes = object.diagnosisCodes as Array<
            Diagnosis['code']
        >;
    } else {
        newEntry.diagnosisCodes = [] as Array<Diagnosis['code']>;
    }
    switch (newEntry.type) {
        case 'HealthCheck':
            if (!('healthCheckRating' in object))
                throw new Error("Missing field 'healthCheckRating'");
            newEntry.healthCheckRating = parseHealthCheckRating(
                object.healthCheckRating
            );
            return newEntry;
        case 'Hospital':
            if ('healthCheckRating' in object) {
                newEntry.healthCheckRating = parseHealthCheckRating(
                    object.healthCheckRating
                );
            }
            if (!('discharge' in object))
                throw new Error("Missing field 'discharge'");
            newEntry.discharge = parseDischarge(object.discharge);
            return newEntry;
        case 'OccupationalHealthcare':
            if ('healthCheckRating' in object) {
                newEntry.healthCheckRating = parseHealthCheckRating(
                    object.healthCheckRating
                );
            }
            if ('sickLeave' in object) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            if (!('employerName' in object))
                throw new Error("Missing field 'employerName'");
            newEntry.employerName = parseEmployerName(object.employerName);
            return newEntry;
        default:
            throw new Error(`Unknown type: ${object.type}`);
    }
};
