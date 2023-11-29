import express from 'express';
import patientsService from '../services/patientsService';
const patientsRoute = express.Router();

patientsRoute.get('/', (_req, res) => res.json(patientsService.getAll()));

export default patientsRoute;
