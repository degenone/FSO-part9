import { useEffect, useState } from 'react';
import { DiaryEntry } from '../types';
import diaryService from '../services/diaryService';
import Entry from './Entry';

const Entries = () => {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    useEffect(() => {
        const fetchDiaries = async () => {
            const data = await diaryService.getAll();
            setDiaryEntries(data);
        };
        fetchDiaries();
    }, []);
    return (
        <div>
            {diaryEntries.map((d) => (
                <Entry key={d.id} entry={d} />
            ))}
        </div>
    );
};

export default Entries;
