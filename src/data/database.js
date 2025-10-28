export const tipoQuarto = [
    { id: 1, tipo: "Simples", capacidade: 1, descricao: "Quarto simples com uma cama de solteiro." },
    { id: 2, tipo: "Duplo", capacidade: 2, descricao: "Quarto duplo com uma cama de casal." },
    { id: 3, tipo: "Suíte", capacidade: 4, descricao: "Suíte espaçosa com duas camas de casal e sala de estar." }
];

export const quartosAtivos = [
    { numero: 101, tipo: "Simples", valorDiaria: 100.00, status: "disponível" },
    { numero: 102, tipo: "Duplo", valorDiaria: 170.00, status: "disponível" },
    { numero: 201, tipo: "Simples", valorDiaria: 100.00, status: "disponível" },
    { numero: 202, tipo: "Duplo", valorDiaria: 170.00, status: "ocupado" },
    { numero: 301, tipo: "Suíte", valorDiaria: 320.00, status: "reservado" },
];

export const clientes = [];
export const reservas = [];

export class CadastrarCliente {
    constructor(id, nome, email, telefone, senha) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha;
    }
};

export class ReservarQuarto {
    constructor(id, idCliente, numeroQuarto, quantidadePessoas, dataReserva, dataEntrada, dataSaida) {
        this.id = id;
        this.idCliente = idCliente; 
        this.numeroQuarto = numeroQuarto;
        this.quantidadePessoas = quantidadePessoas;
        this.dataReserva = dataReserva; 
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
    }
};