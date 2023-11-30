import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
    parts: CoursePart[];
}

const Content = (props: ContentProps) => {
    return props.parts.map((part, i) => (
        <Part key={`${part.name}-${part.exerciseCount}-${i}`} part={part} />
    ));
};

export default Content;
