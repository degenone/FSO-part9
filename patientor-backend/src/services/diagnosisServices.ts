import diagnosisData from '../../data/diagnosis';
import { Diagnosis } from '../types';

const getAll = (): Diagnosis[] => {
    return diagnosisData;
};

export default {
    getAll,
};
