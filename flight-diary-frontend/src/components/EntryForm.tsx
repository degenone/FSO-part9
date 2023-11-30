import React, { useState } from 'react';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry, Visibility, Weather } from '../types';
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
        if (!visibility || !weather) {
            let message;
            if (!visibility && !weather) {
                message = 'Visibility and Weather options are required.';
            } else if (!visibility) {
                message = 'Visibility option is required.';
            } else {
                message = 'Weather option is required.';
            }
            props.showNotification(message);
            return;
        }
        const newEntry: NewDiaryEntry = {
            date,
            visibility: visibility as Visibility,
            weather: weather as Weather,
        };
        if (comment) {
            newEntry.comment = comment;
        }
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
                            type='date'
                            name='date'
                            id='date'
                            required
                            value={date}
                            onChange={({ target }) => setDate(target.value)}
                        />
                    </div>
                    <div style={formGroupStyle}>
                        <span>Visibility</span>
                        <div>
                            <input
                                type='radio'
                                name='visibility'
                                id='poor'
                                onChange={() => setVisibility('poor')}
                            />
                            <label htmlFor='poor'>Poor</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='visibility'
                                id='ok'
                                onChange={() => setVisibility('ok')}
                            />
                            <label htmlFor='ok'>Ok</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='visibility'
                                id='good'
                                onChange={() => setVisibility('good')}
                            />
                            <label htmlFor='good'>Good</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='visibility'
                                id='great'
                                onChange={() => setVisibility('great')}
                            />
                            <label htmlFor='great'>Great</label>
                        </div>
                    </div>
                    <div style={formGroupStyle}>
                        <span>Weather</span>
                        <div>
                            <input
                                type='radio'
                                name='weather'
                                id='sunny'
                                onChange={() => setWeather('sunny')}
                            />
                            <label htmlFor='sunny'>Sunny</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='weather'
                                id='rainy'
                                onChange={() => setWeather('rainy')}
                            />
                            <label htmlFor='rainy'>Rainy</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='weather'
                                id='cloudy'
                                onChange={() => setWeather('cloudy')}
                            />
                            <label htmlFor='cloudy'>Cloudy</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='weather'
                                id='windy'
                                onChange={() => setWeather('windy')}
                            />
                            <label htmlFor='windy'>Windy</label>
                        </div>
                        <div>
                            <input
                                type='radio'
                                name='weather'
                                id='stormy'
                                onChange={() => setWeather('stormy')}
                            />
                            <label htmlFor='stormy'>Stormy</label>
                        </div>
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
