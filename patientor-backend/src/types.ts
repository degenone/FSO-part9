export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

interface EntryBase {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export type EntryBaseNoId = Omit<EntryBase, 'id'>;

export enum HealthCheckRating {
    Healty = 0,
    LowRisk = 1,
    HighRisk = 2,
    CriticalRisk = 3,
}

interface HealthCheckEntry extends EntryBase {
    type: 'HealthCheck';
    healthCheckRating: HealthCheckRating;
}

export type Discharge = {
    date: string;
    criteria: string;
};

interface HospitalEntry extends EntryBase {
    type: 'Hospital';
    healthCheckRating?: HealthCheckRating;
    discharge: Discharge;
}

export type SickLeave = {
    startDate: string;
    endDate: string;
};

interface OccupationalHealthcare extends EntryBase {
    type: 'OccupationalHealthcare';
    healthCheckRating?: HealthCheckRating;
    sickLeave?: SickLeave;
    employerName: string;
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcare;

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
    ? Omit<T, K>
    : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export type PatientData = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
};

export type Patient = Omit<PatientData, 'ssn'>;

export type NewPatient = Omit<PatientData, 'id'>;
