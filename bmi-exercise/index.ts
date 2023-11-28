import express from 'express';
import calculateBmi from './bmiCalculator';
import { ExerciseReport, calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
const PORT = 3003;

app.get('/hello', (_req, res) => res.send('Hello, Full Stack!'));

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if (isNaN(height) || isNaN(weight)) {
        return res.status(400).send({ error: 'malformated parameters' });
    }
    const bmiResult = calculateBmi(height, weight);
    return res.json({
        height,
        weight,
        bmi: bmiResult,
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { target, daily_exercises } = req.body;
    if (!target || !daily_exercises) {
        return res.status(400).send({ error: 'missing parameters' });
    }
    if (
        isNaN(Number(target)) ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
        daily_exercises.some((e: any) => isNaN(Number(e)))
    ) {
        return res.status(400).send({ error: 'malformated parameters' });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    const hours: number[] = daily_exercises.map((e: any) => Number(e));
    const result: ExerciseReport = calculateExercises(hours, Number(target));
    return res.json(result);
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
