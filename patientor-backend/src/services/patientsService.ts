import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients-full';
import { NewPatient, Patient, PatientData } from '../types';

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

const getById = (patientId: string): PatientData | undefined =>
    patientData.find((p) => p.id === patientId);

export default {
    getAll,
    create,
    getById,
};
