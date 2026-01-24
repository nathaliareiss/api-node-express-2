

import 'dotenv/config';

const API_KEY = process.env.GOOGLE_API_KEY;
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

const url='https://www.googleapis.com/calendar/v3'

class calendarioController {

  static verCalendario = async (req, res, next) => {
    try { 
        const response= await fetch(url)

      res.status(200).json(livrosResultado);
    } catch (erro) {
      next(erro)
  }}}

  export default calendarioController