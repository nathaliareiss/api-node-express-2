import mongoose from "mongoose";

const EventoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  livro: {
    type: String,
    required: true
  },
  inicio: {
    type: Date,
    required: true
  },
  fim: {
    type: Date
  },
  status: {
    type: String,
    enum: ["lendo", "finalizado"],
    default: "lendo"
  }
}, { timestamps: true });

export default mongoose.model("Evento", EventoSchema);
