
import { google } from "googleapis";
import Evento from "../models/Evento.js";


export async function criarEvento(req, res) {
  try {
    const auth = await getAuthClient(req.user.id);
    const calendar = google.calendar({ version: "v3", auth });

    const { summary, description, startISO, endISO } = req.body;

    const eventoGoogle = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary,
        description,
        start: { dateTime: startISO },
        end: { dateTime: endISO },
      },
    });

    // 👇 salvar também no Mongo
    const evento = await Evento.create({
      userId: req.userId,
      titulo: summary,
      descricao: description,
      inicio: startISO,
      fim: endISO,
      googleEventId: eventoGoogle.data.id
    });

    res.status(201).json(evento);
  } catch (err) {
    res.status(400).json({ mensagem: err.message });
  }
}

export async function listarEventos(req, res) {
  const eventos = await Evento.find({ userId: req.userId });
  res.json(eventos);
}