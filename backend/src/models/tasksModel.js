const connection = require('./connection')
const getAllUsers = async () => {
    const [usuarios] = await connection.execute(' SELECT * FROM Usuario')
    return usuarios;
};

async function createUser(user) {

    console.log('Dados do usuário recebidos no modelo:', user);

    if (!user) {
        throw new Error('Objeto usuário está undefined');
    }

    const {
        cpf_usuario,
        nome_usuario,
        tipo_usuario,
        sobrenome_usuario,
        email_usuario,
        telefone_usuario,
        senha_usuario
    } = user;

    const createUserQuery = 'INSERT INTO Usuario (cpf_usuario, nome_usuario, tipo_usuario, sobrenome_usuario, email_usuario, telefone_usuario, senha_usuario) VALUES (?,?,?,?,?,?,?)';

   try {
        const [result] = await connection.execute(
            createUserQuery,
            [cpf_usuario, nome_usuario, tipo_usuario, sobrenome_usuario, email_usuario, telefone_usuario, senha_usuario]
        );
        return {insertId: result.insertId};

   } catch (error){
        console.error('Error creating user:', error);
        throw error;
   }
}

async function deleteUser(cpf_usuario) {
    console.log('Dados do usuário recebidos no modelo para delete:', cpf_usuario);

    const removeUser = await connection.execute('DELETE FROM Usuario WHERE cpf_usuario = ?', [cpf_usuario]);  

    return removeUser; 
    
};

async function updateUser(cpf, user){
    console.log('Dados do usuário recebidos no modelo para update para o usuario:', cpf);

    if (!user) {
        throw new Error('Objeto usuário está undefined');
    }

    const {
        cpf_usuario,
        nome_usuario,
        tipo_usuario,
        sobrenome_usuario,
        email_usuario,
        telefone_usuario,
        senha_usuario
    } = user;

    const updateUserQuery = 
    `UPDATE Usuario SET nome_usuario = "${nome_usuario}", tipo_usuario = "${tipo_usuario}", sobrenome_usuario = "${sobrenome_usuario}", email_usuario = "${email_usuario}", telefone_usuario = "${telefone_usuario}", senha_usuario = "${senha_usuario}" WHERE cpf_usuario = "${cpf_usuario}"; `;

    console.log(updateUserQuery);

   try {
        const [result] = await connection.execute(
            updateUserQuery,
            // [ 
            //     nome_usuario,
            //     tipo_usuario,
            //     sobrenome_usuario,
            //     email_usuario,
            //     telefone_usuario,
            //     senha_usuario, 
            //     cpf_usuario
            // ]
        );
        console.log(result);
        return {insertId: result.insertId};
    } catch (error){
        console.error('Error creating user:', error);
        throw error;
   };

};

module.exports = {
    getAllUsers, 
    createUser,
    deleteUser,
    updateUser,
}