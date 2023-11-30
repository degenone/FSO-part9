type Course = {
    name: string;
    exerciseCount: number;
};

interface ContentProps {
    parts: Course[];
}

const Content = (props: ContentProps) => {
    return props.parts.map((part, i) => (
        <p key={`${part.name}-${part.exerciseCount}-${i}`}>
            {part.name} &mdash; {part.exerciseCount}
        </p>
    ));
};

export default Content;
