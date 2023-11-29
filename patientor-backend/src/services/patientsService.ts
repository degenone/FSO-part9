import { v4 as uuidv4 } from 'uuid';
import patientData from '../../data/patients';
import { NewPatient, Patient } from '../types';

const getAll = (): Patient[] =>
    patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));

const create = (newPatient: NewPatient): Patient => {
    const id: string = uuidv4();
    const patient = {
        id,
        ...newPatient,
    };
    patientData.push(patient);
    return patient;
};

export default {
    getAll,
    create,
};
