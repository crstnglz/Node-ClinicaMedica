const { fakerES: faker } = require('@faker-js/faker');

const roles = ['medico', 'recepcionista'];

const genUsuarios = (cantidad = 1) => {
    const usuarios = [];
    for(let i = 0; i < cantidad; i++)
    {
        usuarios.push({
            nombre: faker.person.fullName(),
            email: faker.internet.email(),
            password: '$2b$10$Tnklb7wvD1SX1a00GW.hr.okXLzxJNAg2DUzRP2l7Ml1RSWUpyobK',
            rol: roles[Math.floor(Math.random() * roles.length)],
            especialidad: faker.person.jobTitle()
        });
    }
    return usuarios;
}

module.exports = { genUsuarios };