import mongoose from "mongoose";


const EventoSchema = new mongoose.Schema({
  titulo: String,
  inicio: Date,
  fim: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});


export default mongoose.model("Evento", EventoSchema);
