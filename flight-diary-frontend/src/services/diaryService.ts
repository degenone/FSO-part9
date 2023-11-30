import axios from 'axios';
import { DiaryEntry } from '../types';
const URL = 'http://localhost:3000/api/diaries';

const getAll = async () => {
    const res = await axios.get<DiaryEntry[]>(URL);
    return res.data;
};

const create = async (entry: unknown) => {
    const res = await axios.post<DiaryEntry>(URL, entry);
    return res.data;
};

export default {
    getAll,
    create,
};
