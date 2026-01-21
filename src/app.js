import express from "express";
import db from "./config/dbConnect.js"
import routes from "./routes/index.js"
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import cors from 'cors'


db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();
app.use(cors({origin:'*'}));
app.use(express.json())
routes(app);

app.use(manipuladorDeErros)

//cor deu erro por colocar apos as rotaas, o jeito e colocar ele antes das rotas


export default app