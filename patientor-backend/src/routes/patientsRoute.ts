import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient from '../utlis';
const patientsRoute = express.Router();

patientsRoute.get('/', (_req, res) => res.json(patientsService.getAll()));

patientsRoute.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        const patient = patientsService.create(newPatient);
        res.json(patient);
    } catch (error: unknown) {
        let errMsg = 'Failed saving new patient.';
        if (error instanceof Error) {
            errMsg += ` [ERR] ${error.message}`;
        }
        res.status(400).send({ error: errMsg });
    }
});

patientsRoute.get('/:id', (req, res) => {
    const patient = patientsService.getById(req.params.id);
    if (patient === null) return res.status(404).end();
    return res.json(patient);
});

export default patientsRoute;
