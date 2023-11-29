import express from 'express';
import patientsService from '../services/patientsService';
import { Gender, Patient } from '../types';
const patientsRoute = express.Router();

patientsRoute.get('/', (_req, res) => res.json(patientsService.getAll()));

patientsRoute.post('/', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const newPatient: Patient = patientsService.create({
        name: name as string,
        dateOfBirth: dateOfBirth as string,
        ssn: ssn as string,
        gender: gender as Gender,
        occupation: occupation as string,
    });
    res.json(newPatient);
});

export default patientsRoute;
