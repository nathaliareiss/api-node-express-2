import express from "express";
import db from "./config/dbConnect.js"
import cspMiddleware from "./middlewares/csp.js";
import routes from "./routes/index.js"
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import cors from 'cors'
import calendarRoutes from './routes/calendarRoutes.js'



db.on("error", console.log.bind(console, 'Erro de conexão'))
db.once("open", () => {
  console.log('conexão com o banco feita com sucesso')
})

const app = express();

app.use(cors({origin:'*'}));
app.use(express.json());

app.use(cspMiddleware)

routes(app);


app.use('/api/calendar', calendarRoutes)


app.use(manipuladorDeErros)



//cors deu erro por colocar apos as rotaas, o jeito e colocar ele antes das rotas


export default app