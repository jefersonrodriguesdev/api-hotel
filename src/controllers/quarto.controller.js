import quartoService from '../services/quarto.service.js';

const criar = async (req, res, next) => {
  try {
    const quarto = await quartoService.criarQuarto(req.body);
    return res.status(201).json({
      message: "Quarto criado com sucesso!",
      quarto
    });
  } catch (err) {
    next(err);
  }
};

const listar = async (req, res, next) => {
  try {
    const quartos = await quartoService.listarQuartos();
    return res.status(200).json(quartos);
  } catch (err) {
    next(err);
  }
};

const buscarPorNumero = async (req, res, next) => {
  try {
    const numero = parseInt(req.params.numero);
    const quarto = await quartoService.buscarPorNumero(numero);
    return res.status(200).json(quarto);
  } catch (err) {
    next(err);
  }
};

const atualizar = async (req, res, next) => {
  try {
    const numero = parseInt(req.params.numero);
    const quarto = await quartoService.atualizarQuarto(numero, req.body);
    return res.status(200).json({
      message: "Quarto atualizado com sucesso!",
      quarto
    });
  } catch (err) {
    next(err);
  }
};

const deletar = async (req, res, next) => {
  try {
    const numero = parseInt(req.params.numero);
    await quartoService.deletarQuarto(numero);
    // pode ser 204, mas 200 com mensagem é ok
    return res.status(200).json({ message: "Quarto deletado com sucesso." });
  } catch (err) {
    next(err);
  }
};

export default {
  criar,
  listar,
  buscarPorNumero,
  atualizar,
  deletar
};
