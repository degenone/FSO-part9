export type Diagnosis = {
    code: string;
    name: string;
    latin?: string;
};

export type Gender = 'male' | 'female' | 'other';

export type PatientData = {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
};

export type Patient = Omit<PatientData, 'ssn'>;
