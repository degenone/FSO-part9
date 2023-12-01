import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';
import { NewPatient, Patient } from '../types';

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
    const id: string = uuidv4();
    const patient = {
        id,
        ...newPatient,
    };
    patientData.push(patient);
    return patient;
};

const getById = (patientId: string): Patient | null => {
    const patient = patientData.find((p) => p.id === patientId);
    if (!patient) return null;
    return {
        id: patient.id,
        name: patient.name,
        dateOfBirth: patient.dateOfBirth,
        gender: patient.gender,
        occupation: patient.occupation,
        entries: patient.entries,
    };
};

export default {
    getAll,
    create,
    getById,
};
