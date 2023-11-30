import React, { useState } from 'react';
import diaryService from '../services/diaryService';
import { DiaryEntry } from '../types';
import axios from 'axios';

interface EntryFormProps {
    addEntry: (entry: DiaryEntry) => void;
    showNotification: (message: string) => void;
}

const EntryForm = (props: EntryFormProps) => {
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState('');
    const [weather, setWeather] = useState('');
    const [comment, setComment] = useState('');
    const handelSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const newEntry = {
            date,
            visibility,
            weather,
            comment,
        };
        try {
            const addedEntry = await diaryService.create(newEntry);
            props.addEntry(addedEntry);
            setDate('');
            setVisibility('');
            setWeather('');
            setComment('');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && 'data' in error.response) {
                    props.showNotification(error.response.data);
                } else {
                    props.showNotification(error.message);
                }
            } else {
                console.error(error);
            }
        }
    };
    const formGroupStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginBottom: 5,
    };
    return (
        <div>
            <form onSubmit={handelSubmit} style={{ width: 'max-content' }}>
                <fieldset>
                    <legend>Add new diary entry</legend>
                    <div style={formGroupStyle}>
                        <label htmlFor='date'>Date</label>
                        <input
                            type='text'
                            name='date'
                            id='date'
                            required
                            value={date}
                            onChange={({ target }) => setDate(target.value)}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor='visibility'>Visibility</label>
                        <input
                            type='text'
                            name='visibility'
                            id='visibility'
                            required
                            value={visibility}
                            onChange={({ target }) =>
                                setVisibility(target.value)
                            }
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor='weather'>Weather</label>
                        <input
                            type='text'
                            name='weather'
                            id='weather'
                            required
                            value={weather}
                            onChange={({ target }) => setWeather(target.value)}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <label htmlFor='comment'>Comment</label>
                        <input
                            type='text'
                            name='comment'
                            id='comment'
                            value={comment}
                            onChange={({ target }) => setComment(target.value)}
                        />
                    </div>
                    <div>
                        <input type='submit' value='Save' />
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default EntryForm;
