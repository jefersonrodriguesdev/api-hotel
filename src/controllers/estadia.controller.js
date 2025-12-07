import estadiaService from '../services/estadia.service.js';

const checkin = async (req, res) => {
    const estadia = await estadiaService.checkin(req.body);
    res.status(201).json({ mensagem: "Check-in realizado com sucesso!", estadia });
};

const checkout = async (req, res) => {
    const resultado = await estadiaService.checkout(req.body);
    res.status(200).json(resultado);
};

export default { checkin, checkout };