const validadeBody = async (request, response, next) => {
    const car = request.body; 
    const  {
        veiculo_id,
        veiculo_cor,
        veiculo_marca,
        veiculo_placa,
        veiculo_motor,
        veiculo_km,
        cpf_usuario,
    } = car;

     // Log para depuração
     console.log('Dados do usuário recebidos no middleware:', car);

     if(!car){
        throw new Error('Objeto car está undefined');
     }

     if (!veiculo_id || !veiculo_cor || !veiculo_marca || !veiculo_placa  || !veiculo_motor || !veiculo_km || !cpf_usuario) {
        throw new Error("All user fields are required");
    }
    next();
}

module.exports ={
    validadeBody,
};