import quartoRepository from '../repositories/quarto.repository.js';
import tipoQuartoRepository from '../repositories/tipoQuarto.repository.js';
import reservaRepository from '../repositories/reserva.repository.js';
import usuarioRepository from '../repositories/usuario.repository.js';
import ApiError from '../errors/ApiError.js';

const _populateReserva = async (reserva) => {
    
    const [quarto, cliente] = await Promise.all([
        quartoRepository.findByNumero(reserva.numeroQuarto),
        usuarioRepository.findById(reserva.idCliente)
    ]);

    
    const clienteInfo = cliente ? {
        id: cliente.id,
        nome: cliente.nome, 
        email: cliente.email,
        telefone: cliente.telefone
    } : null;

    // Monta as informações do quarto
    const quartoInfo = quarto ? {
        numero: quarto.numero,
        tipo: quarto.tipo, 
        valorDiaria: quarto.valorDiaria
    } : null;

    return {
        id: reserva.id,
        dataReserva: reserva.dataReserva,
        dataEntrada: reserva.dataEntrada,
        dataSaida: reserva.dataSaida,
        quantidadePessoas: reserva.quantidadePessoas,
        quarto: quartoInfo,
        cliente: clienteInfo
    };
};

const criarReserva = async (dadosReserva) => {
    const { numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = dadosReserva;

    const quarto = await quartoRepository.findByNumero(numeroQuarto);
    if (!quarto) {
        throw new ApiError("Quarto não encontrado.", 404);
    }

    const infoTipoQuarto = await tipoQuartoRepository.findByTipo(quarto.tipo);
    if (quantidadePessoas > infoTipoQuarto.capacidade) {
        throw new ApiError(`A quantidade de pessoas excede a capacidade do quarto (${infoTipoQuarto.capacidade}).`, 400);
    }

    const reservasConflitantes = await reservaRepository.findConflito(numeroQuarto, dataEntrada, dataSaida);
    if (reservasConflitantes.length > 0) {
        throw new ApiError("Este quarto já está reservado para o período solicitado.", 409);
    }

    const novaReserva = await reservaRepository.create(dadosReserva);
    return novaReserva;
};

const listarReservas = async () => {
  const reservas = await reservaRepository.findAll();
  const reservaspopuladas = await Promise.all(
    reservas.map(r => _populateReserva(r))
  );
  return reservaspopuladas;
};

const buscarReservaPorId = async (id) => {
  const reserva = await reservaRepository.findById(id);
  if (!reserva) {
      throw new ApiError("Reserva não encontrada.", 404);
  }
  return await _populateReserva(reserva);
};

const atualizarReserva = async (id, dadosReserva) => {
    const { numeroQuarto, quantidadePessoas, dataEntrada, dataSaida } = dadosReserva;

    await buscarReservaPorId(id); 

    const quarto = await quartoRepository.findByNumero(numeroQuarto);
    if (!quarto) {
        throw new ApiError("Quarto não encontrado.", 404);
    }

    const infoTipoQuarto = await tipoQuartoRepository.findByTipo(quarto.tipo);
    if (quantidadePessoas > infoTipoQuarto.capacidade) {
        throw new ApiError(`A quantidade de pessoas excede a capacidade do quarto (${infoTipoQuarto.capacidade}).`, 400);
    }
    
    const reservasConflitantes = await reservaRepository.findConflito(numeroQuarto, dataEntrada, dataSaida);
    if (reservasConflitantes.length > 0) {
        throw new ApiError("Este quarto já está reservado para o período solicitado.", 409);
    }

    return await reservaRepository.update(id, dadosReserva);
};

const deletarReserva = async (id) => {
    const sucesso = await reservaRepository.remove(id);
    if (!sucesso) {
        throw new ApiError("Reserva não encontrada.", 404);
    }
    return sucesso;
};

export default {
    criarReserva,
    listarReservas,
    buscarReservaPorId,
    atualizarReserva,
    deletarReserva,
};