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
    const patient = {
        id: uuidv4(),
        ...newPatient,
    };
    patientData.push(patient);
    return patient;
};

const getById = (patientId: string): PatientData | undefined =>
    patientData.find((p) => p.id === patientId);

const addEntry = (
    patientId: string,
    newEntry: NewEntry
): PatientData | null => {
    const patient = patientData.find((p) => p.id === patientId);
    if (!patient) return null;
    const entry = {
        id: uuidv4(),
        ...newEntry,
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
