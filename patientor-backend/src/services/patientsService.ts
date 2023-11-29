import patientData from '../../data/patients';
import { Patient } from '../types';

const getAll = (): Patient[] =>
    patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));

export default {
    getAll,
};
