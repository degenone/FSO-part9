import { useEffect, useState } from 'react';
import Entries from './components/Entries';
import diaryService from './services/diaryService';
import { DiaryEntry } from './types';
import EntryForm from './components/EntryForm';

function App() {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    useEffect(() => {
        const fetchDiaries = async () => {
            const data = await diaryService.getAll();
            setDiaryEntries(data);
        };
        fetchDiaries();
    }, []);
    const addEntry = (newEntry: DiaryEntry) =>
        setDiaryEntries([...diaryEntries, newEntry]);
    return (
        <div>
            <h1>Ilari's Flight Diaries App.</h1>
            <EntryForm addEntry={addEntry} />
            <Entries entries={diaryEntries} />
        </div>
    );
}

export default App;
