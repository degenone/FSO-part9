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

export type PatientData = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
};

export type Patient = Omit<PatientData, 'ssn'>;

export type NewPatient = Omit<PatientData, 'id'>;
