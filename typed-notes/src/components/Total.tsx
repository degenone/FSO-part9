interface TotalProps {
    count: number;
}

const Total = (props: TotalProps) => (
    <p>
        Total number of exercises: {props.count}
        {props.count === 69 ? '. Nice!' : '.'}
    </p>
);

export default Total;
