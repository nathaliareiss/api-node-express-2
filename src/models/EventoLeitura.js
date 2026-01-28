import mongoose from "mongoose";

const EventoLeituraSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    livroId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livro",
      required: true,
    },

    tipo: {
      type: String,
      enum: ["inicio", "fim"],
      required: true,
    },

    data: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("EventoLeitura", EventoLeituraSchema);
