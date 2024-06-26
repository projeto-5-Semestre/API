const express = require('express');

const router = express.Router();

//Usuarios
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

router.get('/tasks', tasksController.getAllUsers);
router.post('/tasks', tasksMiddleware.validadeBody, tasksController.createUser);
router.delete('/tasks/:cpf_usuario', tasksController.deleteUser);
router.put('/tasks/:cpf_usuario', tasksController.updateUser);

//Veiculos
const carController = require('./controllers/carController');
const carMiddleware = require('./middlewares/carMiddleware');

router.get('/veiculo', carController.getAllCars);
router.post('/veiculo', carMiddleware.validadeBody, carController.createCar);
router.delete('/veiculo/:cpf_usuario', carController.deleteCar);
router.put('/veiculo/:cpf_usuario', carController.updateCar);

module.exports = router;