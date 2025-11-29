import estadiaRepository from '../repositories/estadia.repository.js';
import hospedeRepository from '../repositories/hospede.repository.js';
import ApiError from '../errors/ApiError.js';

const checkin = async (dados) => {
    const { clienteId, numeroQuarto, valorDiaria, dataEntrada } = dados;

    if (!clienteId || !numeroQuarto || !valorDiaria || !dataEntrada) {
        throw new ApiError("Dados incompletos para Check-in.", 400);
    }

    // Regra de Negócio: O Hóspede existe?
    const hospede = await hospedeRepository.findById(clienteId);
    if (!hospede) {
        throw new ApiError("Hóspede não encontrado. Verifique o ID.", 404);
    }

    // Aqui poderia verificar se o quarto está disponível (usando quartoRepository)

    return await estadiaRepository.create(dados);
};

const checkout = async (dados) => {
    const { estadiaId, dataSaida } = dados;

    if (!estadiaId || !dataSaida) {
        throw new ApiError("ID da estadia e Data de Saída são obrigatórios.", 400);
    }
    
    const estadia = await estadiaRepository.findById(estadiaId);
    if (!estadia) {
        throw new ApiError("Estadia não encontrada.", 404);
    }
    if (estadia.dataSaida) {
        throw new ApiError("Checkout já realizado para esta estadia.", 400);
    }

    // Cálculos
    const entrada = new Date(estadia.dataEntrada);
    const saida = new Date(dataSaida);
    
    if (saida <= entrada) {
        throw new ApiError("Data de saída deve ser posterior à data de entrada.", 400);
    }

    const diffMs = saida - entrada;
    // Arredonda para cima para cobrar diária completa se passar do horário
    const dias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
    // Regra: Cobra no mínimo 1 diária
    const diasCobrados = dias > 0 ? dias : 1; 
    const valorTotal = diasCobrados * estadia.valorDiaria;

    // Atualiza a estadia no banco
    const estadiaAtualizada = await estadiaRepository.update(estadiaId, { 
        dataSaida, 
        valorTotal, 
        diasCobrados 
    });

    return { 
        mensagem: "Checkout realizado com sucesso", 
        estadia: estadiaAtualizada 
    };
};

export default { checkin, checkout };