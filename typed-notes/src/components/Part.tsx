import { CoursePart } from '../types';
import { assertNever } from '../utlis';

interface PartProps {
    part: CoursePart;
}

const Part = (props: PartProps) => {
    const { part } = props;
    switch (part.kind) {
        case 'basic':
            return (
                <div>
                    <p>
                        <strong>
                            {part.name} &mdash; {part.exerciseCount}
                        </strong>
                    </p>
                    <p>
                        Description: <i>{part.description}</i>
                    </p>
                </div>
            );
        case 'group':
            return (
                <div>
                    <p>
                        <strong>
                            {part.name} &mdash; {part.exerciseCount}
                        </strong>
                    </p>
                    <p>Group project count: {part.groupProjectCount}</p>
                </div>
            );
        case 'background':
            return (
                <div>
                    <p>
                        <strong>
                            {part.name} &mdash; {part.exerciseCount}
                        </strong>
                    </p>
                    <p>
                        Description: <i>{part.description}</i>
                    </p>
                    <p>
                        Background material can be found at{' '}
                        <a href={part.backgroundMaterial}>
                            {part.backgroundMaterial}
                        </a>
                    </p>
                </div>
            );
        case 'special':
            return (
                <div>
                    <p>
                        <strong>
                            {part.name} &mdash; {part.exerciseCount}
                        </strong>
                    </p>
                    <p>
                        Description: <i>{part.description}</i>
                    </p>
                    <p>Required skills: {part.requirements.join(', ')}</p>
                </div>
            );
        default:
            assertNever(part);
            break;
    }
};

export default Part;
