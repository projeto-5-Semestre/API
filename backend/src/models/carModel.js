const connection = require('./connection');

async function getAllCars(){
    const [car] = await connection.execute('SELECT * FROM `Veiculo` LIMIT 100')
    return car;
}

async function createCar(car){
    console.log("Dados do veiculo na model:", car);

    if (!car) {
        throw new Error('Objeto usuário está undefined');
    }

    const  {
        veiculo_id,
        veiculo_cor,
        veiculo_marca,
        veiculo_placa,
        veiculo_motor,
        veiculo_km,
        cpf_usuario,
    } = car;
    
        const createCarQuery = `INSERT INTO Veiculo (veiculo_id, veiculo_cor, veiculo_marca, veiculo_placa, veiculo_motor, veiculo_km, cpf_usuario) VALUES (?,?,?,?,?,?,?)`;

        try{
            const [result] = await connection.execute(
                createCarQuery,
                [veiculo_id,
                veiculo_cor,
                veiculo_marca,
                veiculo_placa,
                veiculo_motor,
                veiculo_km,
                cpf_usuario,]
            );
            return {insertId: result.insertId};
        }catch(error){
            console.error('Error creating car:', error);
            throw error;
        }
}

async function deleteCar(cpf_usuario, veiculo_id){
    console.log('Dados do carro recebidos no controller para delete:', cpf_usuario, veiculo_id);

    const removeCar = await connection.execute(`DELETE FROM Veiculo WHERE cpf_usuario = ${cpf_usuario} AND veiculo_id = ${veiculo_id}`);  

    return removeCar; 
}

async function updateCar(cpf, car){

    console.log('Dados do usuário recebidos no modelo para update para o usuario:', cpf);

    if(!car){
        throw new Error('Objeto usuário está undefined');
    }

    const  {
        veiculo_id,
        veiculo_cor,
        veiculo_marca,
        veiculo_placa,
        veiculo_motor,
        veiculo_km,
        cpf_usuario,
    } = car;

    const updateCarQuery = `UPDATE Veiculo SET  veiculo_cor = "${veiculo_cor}", veiculo_marca = "${veiculo_marca}", veiculo_placa = "${veiculo_placa}", veiculo_motor = "${veiculo_motor}", veiculo_km = "${veiculo_km}" WHERE cpf_usuario = "${cpf_usuario}" AND veiculo_id = "${veiculo_id}"`;

    console.log(updateCarQuery);

    try{
        const [result] = await connection.execute(
            updateCarQuery
        );
        return {insertId: result.insertId};
    } catch{error}{
        console.error('Error creating user:', error);
        throw error;
    }

};



module.exports = {
    getAllCars,
    createCar,
    deleteCar,
    updateCar,
}