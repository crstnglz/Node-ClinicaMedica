const typeDefs = `
    type Cita {
        id: Int
        id_paciente: Int
        id_medico: Int 
        fecha: String
        hora: String
        duracion_min: Int
        estado: String 
        motivo: String
    }

    type CitasPorMedico {
        id_medico: Int 
        total: Int
    }

    type DuracionPromedio {
        id_medico: Int
        promedio: Float
    }

    type EntradaHistorial {
        fecha: String 
        id_medico: Int
        observaciones: String 
        diagnostico: String 
        tratamiento: String
    }

    type Historial {
        id_paciente: Int 
        entradas: [EntradaHistorial]
    }

    type Query {
        citasFinalizadasPorMedico: [CitasPorMedico]
        citasPendientesHoy: [Cita]
        duracionPromedioporMedico: [DuracionPromedio]
        historialPaciente(id_paciente: Int!): Historial
    }
`

export default typeDefs;