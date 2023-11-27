import parseNumberArgv from './parseNumberArgv';

interface ExerciseReport {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (
    exerciseHours: number[],
    target: number
): ExerciseReport => {
    const descriptions: string[] = [
        'Better step up your game!',
        'Almost there. Next time, you got this!',
        'Great job! You hit the target.',
    ];
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.reduce(
        (acc, h) => (h > 0 ? acc + 1 : acc),
        0
    );
    const average = exerciseHours.reduce((acc, h) => acc + h, 0) / periodLength;
    const success = average >= target;
    const rating = success ? 3 : average < target / 2 ? 1 : 2;
    const ratingDescription = descriptions[rating - 1];
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

try {
    const [target, ...hours] = parseNumberArgv(process.argv, 4, Infinity);
    console.log(calculateExercises(hours, target));
} catch (error) {
    let errMsg = 'Failed calculating exercises.';
    if (error instanceof Error) {
        errMsg += ` Error: ${error.message}`;
    }
    console.error(errMsg);
}
