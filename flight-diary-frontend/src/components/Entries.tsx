import { DiaryEntry } from '../types';
import Entry from './Entry';

interface EntriesProps {
    entries: DiaryEntry[];
}

const Entries = (props: EntriesProps) => {
    return (
        <div>
            {props.entries.map((d) => (
                <Entry key={d.id} entry={d} />
            ))}
        </div>
    );
};

export default Entries;
