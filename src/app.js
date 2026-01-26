import express from "express";
import db from "./config/dbConnect.js"
import googleRoutes from "./routes/googleRoutes.js";
import calendarRoutes from "./routes/calendarRoutes.js"
import cspMiddleware from "./middlewares/csp.js";
import routes from "./routes/index.js"
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import cors from 'cors'




db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();

app.use(cors({origin:'*'}));
app.use(express.json());

app.use(cspMiddleware)


app.use((req, res, next) => {
  req.user = { id: "ID_DO_USUARIO_LOGADO" };
  next();
});

routes(app);

app.use(manipuladorDeErros)



//cors deu erro por colocar apos as rotaas, o jeito e colocar ele antes das rotas
//as rotas devem ficar em penultimo. e manipulador de erros sempre por ultimo

export default app