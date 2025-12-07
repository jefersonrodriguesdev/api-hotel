import relatorioService from '../services/relatorio.service.js';

const listar = async (req, res) => {
    // Passa os parâmetros da query string (ex: ?mes=10) para o serviço
    const dados = await relatorioService.listarRelatorio(req.query);
    res.status(200).json(dados);
};

export default { listar };