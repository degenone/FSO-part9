import { useEffect, useState } from 'react';
import axios from 'axios';
import Entries from './components/Entries';
import diaryService from './services/diaryService';
import { DiaryEntry } from './types';
import EntryForm from './components/EntryForm';
import Notification from './components/Notification';

function App() {
    const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const fetchDiaries = async () => {
            try {
                const data = await diaryService.getAll();
                setDiaryEntries(data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    showNotification(error.message);
                } else {
                    console.error(error);
                }
            }
        };
        fetchDiaries();
    }, []);
    const showNotification = (message: string) => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(''), 3500);
    };
    const addEntry = (newEntry: DiaryEntry) =>
        setDiaryEntries([...diaryEntries, newEntry]);
    return (
        <div>
            <h1>Ilari's Flight Diaries App.</h1>
            <Notification message={errorMessage} />
            <EntryForm
                addEntry={addEntry}
                showNotification={showNotification}
            />
            <Entries entries={diaryEntries} />
        </div>
    );
}

export default App;
