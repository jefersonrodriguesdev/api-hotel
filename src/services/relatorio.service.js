import db from '../database/index.js';
const listarRelatorio = async (filtros) => {
const { clienteId, mes, ano } = filtros;
// Começamos selecionando tudo
let query = 'SELECT * FROM estadias WHERE 1=1';
let values = [];
let contador = 1;
// Se 8ver filtro de Cliente, adicionamos no SQL
if (clienteId) {
query += ` AND id_cliente = $${contador}`;
values.push(clienteId);
contador++;
}
// Se 8ver filtro de Ano, adicionamos
if (ano) {
query += ` AND EXTRACT(YEAR FROM data_entrada) = $${contador}`;
values.push(ano);
contador++;
}
// Se 8ver filtro de Mês, adicionamos
if (mes) {
query += ` AND EXTRACT(MONTH FROM data_entrada) = $${contador}`;
values.push(mes);
contador++;
}
const { rows } = await db.query(query, values);
// Reu8lizamos a formatação manual para manter o padrão
return rows.map(row => ({
id: row.id,
clienteId: row.id_cliente,
numeroQuarto: row.numero_quarto,
dataEntrada: row.data_entrada,
valorTotal: row.valor_total
}));
};
export default { listarRelatorio };