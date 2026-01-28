import Livro from "../models/Livro.js"; 
import EventoLeitura from "../models/EventoLeitura.js";


class LeituraController {

    static iniciarLeitura = async (req, res, next) => {
        try{
            const userId = req.userId;
            const { livroId } = req.params;

            const livro = await Livro.findOne({ _id: livroId, userId });
            
            if (!livro) {
                return res.status(404).json({ message: "Livro não encontrado na sua estante." });
            }
            if (livro.statusLeitura === "lendo") {
                return res.status(400).json({ message: "A leitura já foi iniciada." });
            }
            const agora = new Date();
            livro.statusLeitura = "lendo";
            livro.dataInicioLeitura = agora;
            await livro.save();

            const eventoLeitura = await EventoLeitura.create({
                userId,
                livroId,
                dataInicio: agora,
            });

            res.status(201).json({
                message: "Leitura iniciada com sucesso.", 
                eventoLeitura });
        } catch (erro) {
            next(erro);
        }   
    }

//finalizar a leitura
    static finalizarLeitura = async (req, res, next) => {
        try {
            const userId = req.userId;
            const { livroId } = req.params;
            const evento = await EventoLeitura.findOne({ 
                livroId, 
                userId, 
                dataFim: { $exists: false }
             });

             if (!evento) {
                return res.status(404).json({ message: "Evento de leitura não encontrado ou já finalizado." });
             }

             const fim = new Date()
             const tempoTotal = Math.round((fim - evento.dataInicio) / 1000 / 60); // em minutos
            
                evento.dataFim = fim;
                evento.tempoTotal = tempoTotal;
                await evento.save();

                await Livro.findOneAndUpdate(
                  livroId, {
                      statusLeitura: "Lido",
                      dataFinalLeitura: fim
                    });

                    res.status(200).json({
                        mensagem:"Leitura finalizada com sucesso.",tempoTotal
                    });
        } catch (erro) {
            next(erro);
        }}
    
 //listar o historico de leitura
     static listarLeituras = async (req, res, next) => {      
        try {
            const userId = req.userId;
            const leituras = await EventoLeitura.find({ userId })
                .populate("livroId", "titulo autores")
                .sort({ createdAt: -1 });
            res.status(200).json(leituras);
        
        }   catch (erro) {          
            next(erro);
        }
    }}


export default LeituraController;
 
    

