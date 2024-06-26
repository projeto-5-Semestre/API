const { request, response } = require('express');
const carModel = require('../models/carModel');

const getAllCars = async (_request , response) => {
    const car = await carModel.getAllCars();
    
    return response.status(200).json(car);
};


const createCar = async (request, response) => {
    try {
        const car = request.body; 
        
        const  {
            veiculo_id,
            veiculo_cor,
            veiculo_marca,
            veiculo_placa,
            veiculo_motor,
            veiculo_km,
            cpf_usuario,} = car

        // Log para depuração
        console.log('Dados do carro recebidos no controlador:', car);

        if(
            !veiculo_id ||
            !veiculo_cor ||
            !veiculo_marca ||
            !veiculo_placa ||
            !veiculo_motor ||
            !veiculo_km ||
            !cpf_usuario 
        ){
            return response.status(400).json({ message: 'Dados do carro não fornecidos' });
        }
        const newCar = await carModel.createCar(car);
        return response.status(201).json(newCar);

    } catch (error){
        return response.status(500).json({ message: `Erro ao criar carro: ${error.message}` });
    }
} 

async function deleteCar(request, response){
    const {cpf_usuario} = request.params; 
    const {veiculo_id} = request.body;

    console.log('dados recebidos no modelo do veiculo para delete:', cpf_usuario)

    console.log(request.params);

    await carModel.deleteCar(cpf_usuario, veiculo_id);
    return response.status(204).json();
};

async function updateCar(request, response){
    try{
        const car = request.body;
        const cpf_usuario = request.params;

        console.log('Dados do veiculo recebidos no modelo para update para o usuario:', cpf_usuario);

        const  {
            veiculo_id,
            veiculo_cor,
            veiculo_marca,
            veiculo_placa,
            veiculo_motor,
            veiculo_km
        } = car;

         // Log para depuração
         console.log('Dados do usuário recebidos no controlador:', car);


        if( !veiculo_id||
            !veiculo_cor||
            !veiculo_marca||
            !veiculo_placa||
            !veiculo_motor||
            !veiculo_km ){
                return response.status(400).json({ message: 'Dados do veiculo não fornecidos' });
            }
            const newCar = await carModel.updateCar(cpf_usuario,car);
            return response.status(201).json(newCar);
    } catch(error){
        return response.status(500).json({ message: `Erro ao atualizar o usuário: ${error.message}` });
    }
};

module.exports = {
    getAllCars,
    createCar,
    deleteCar,
    updateCar,
}