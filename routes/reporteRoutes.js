import express from 'express';
import {
    prueba,
    createReportes,
    // getReporte,
    getReportes,
    // updateReportes,
    // deleteReportes,
} from '../controllers/reporteController.js';

const router = express.Router();

// Rutas Publicas
router.get('/prueba', prueba);

// Rutas de gestion CRUD
router.get('/get', getReportes);
// router.get('/get/:id', getReporte);
router.post('/create', createReportes);
// router.put('/update/:id', updateReportes);
// router.delete('/delete/:id', deleteReportes);



export default router;