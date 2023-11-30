import { DiaryEntry } from '../types';

interface DiaryProps {
    entry: DiaryEntry;
}

const Entry = (props: DiaryProps) => {
    return (
        <div>
            <h3>Diary entry on {props.entry.date}</h3>
            <p>Visibility: {props.entry.visibility}</p>
            <p>Weather: {props.entry.weather}</p>
            <p>
                Comment:{' '}
                {props.entry.comment
                    ? props.entry.comment
                    : 'No comment for this entry.'}
            </p>
        </div>
    );
};

export default Entry;
