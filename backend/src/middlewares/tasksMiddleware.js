const validadeBody = async (request, response, next) => {
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
        console.log('Dados do usuário recebidos no middleware:', user);

    if (!user) {
        throw new Error('Objeto usuário está undefined');
    }

    if (!cpf_usuario || !nome_usuario || !tipo_usuario || !sobrenome_usuario || !email_usuario || !telefone_usuario || !senha_usuario) {
        throw new Error("All user fields are required");
    }
    next();
};

module.exports ={
    validadeBody,
};