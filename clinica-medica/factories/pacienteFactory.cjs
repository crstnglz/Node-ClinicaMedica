const { fakerES: faker } = require('@faker-js/faker');

const genPacientes = (cantidad = 1) => {
    const pacientes = [];
    for(let i = 0; i < cantidad; i++)
    {
        pacientes.push({
            nombre: faker.person.firstName(),
            apellidos: faker.person.lastName(),
            dni: faker.string.alphanumeric(9).toUpperCase(),
            fecha_nacimiento: faker.date.birthdate({ min: 18, max: 80, mode: 'age' }).toISOString().split('T')[0],
            telefono: faker.phone.number(),
            email: faker.internet.email()
        });
    }
    return pacientes;
}

module.exports = { genPacientes };