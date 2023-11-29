import express from 'express';
import diagnosisServices from '../services/diagnosisServices';
const diagnosisRoute = express.Router();

diagnosisRoute.get('/', (_req, res) => res.json(diagnosisServices.getAll()));

export default diagnosisRoute;
