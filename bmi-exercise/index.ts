import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();
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

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
