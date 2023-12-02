import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients-full';
import { NewEntry, NewPatient, Patient, PatientData } from '../types';

const getAll = (): Patient[] =>
    patientData.map(
        ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
            entries,
        })
    );

const create = (newPatient: NewPatient): Patient => {
    const id = uuidv4();
    const patient = {
        id,
        ...newPatient,
    };
    patientData.push(patient);
    return patient;
};

const getById = (patientId: string): PatientData | undefined =>
    patientData.find((p) => p.id === patientId);

const addEntry = (patientId: string, newEntry: NewEntry): PatientData | null => {
    const patient = patientData.find((p) => p.id === patientId);
    if (!patient) return null;
    const id = uuidv4();
    const entry = {
        id,
        ...newEntry
    };
    patient.entries.push(entry);
    return patient;
};

export default {
    getAll,
    create,
    getById,
    addEntry,
};
