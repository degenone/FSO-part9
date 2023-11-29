import express from 'express';
import cors from 'cors';
import diagnosisRoute from './routes/diagnosisRoute';
import patientsRoute from './routes/patientsRoute';
const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
const PORT = 3001;

app.get('/api/ping', (_req, res) => res.send('pong'));

app.use('/api/diagnosis', diagnosisRoute);
app.use('/api/patients', patientsRoute);

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
