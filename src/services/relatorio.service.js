import estadiaRepository from '../repositories/estadia.repository.js';

const listarRelatorio = async (filtros) => {
    const { clienteId, mes, ano } = filtros;
    
    let estadias = await estadiaRepository.findAll();

    // Filtro por Cliente (Hóspede)
    if (clienteId) {
        estadias = estadias.filter(e => e.clienteId == clienteId);
    }

    // Filtro por Mês (baseado na data de entrada)
    if (mes) {
        estadias = estadias.filter(e => {
            const data = new Date(e.dataEntrada);
            // getMonth() retorna 0 para Janeiro, 11 para Dezembro. Somamos 1.
            return (data.getMonth() + 1) == mes;
        });
    }

    // Filtro por Ano
    if (ano) {
        estadias = estadias.filter(e => {
            const data = new Date(e.dataEntrada);
            return data.getFullYear() == ano;
        });
    }

    return estadias;
};

export default { listarRelatorio };