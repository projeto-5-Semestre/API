const { request, response } = require('express');
const tasksModel = require('../models/tasksModel')

const getAllUsers = async (_request , response) => {
    const usuarios = await tasksModel.getAllUsers();
    
    return response.status(200).json(usuarios);
};

const createUser = async (request, response) => {
    try {
        const user = request.body;

        const {
            cpf_usuario,
            nome_usuario,
            tipo_usuario,
            sobrenome_usuario,
            email_usuario,
            telefone_usuario,
            senha_usuario
        } = user;

        // Log para depuração
        console.log('Dados do usuário recebidos no controlador:', user);

        if (
            !cpf_usuario ||
            !nome_usuario ||
            !tipo_usuario ||
            !sobrenome_usuario ||
            !email_usuario ||
            !telefone_usuario ||
            !senha_usuario
        ) {
            return response.status(400).json({ message: 'Dados do usuário não fornecidos'});
        }
        const newUser = await tasksModel.createUser(user);
        return response.status(201).json(newUser);
    } catch (error) {
        return response.status(500).json({ message: `Erro ao criar usuário: ${error.message}` });
    }

};

async function deleteUser(request, response){
    const {cpf_usuario} = request.params;  
    console.log(request.params);

    await tasksModel.deleteUser(cpf_usuario);
    return response.status(204).json();
};

async function updateUser(request, response){

    try {
        const user = request.body;
        const cpf_usuario = request.params;

        console.log('Dados do usuário recebidos no modelo para update para o usuario:', cpf_usuario);

        const {
            nome_usuario,
            tipo_usuario,
            sobrenome_usuario,
            email_usuario,
            telefone_usuario,
            senha_usuario
        } = user;

        // Log para depuração
        console.log('Dados do usuário recebidos no controlador:', user);

        if (
            // !cpf_usuario ||
            !nome_usuario ||
            !tipo_usuario ||
            !sobrenome_usuario ||
            !email_usuario ||
            !telefone_usuario ||
            !senha_usuario
        ) {
            return response.status(400).json({ message: 'Dados do usuário não fornecidos' });
        }

        const newUser = await tasksModel.updateUser(cpf_usuario,user);
        return response.status(201).json(newUser);
    } catch (error) {
        return response.status(500).json({ message: `Erro ao atualizar o usuário: ${error.message}` });
    }
};

module.exports = {
    getAllUsers, 
    createUser,
    deleteUser,
    updateUser,
}