import { google } from "googleapis";
import { createOAuthClient } from "../config/googleOAuth.js";
import GoogleAccount from "../models/googleAccount.js";

async function getAuthClient(userId) {
  const account = await GoogleAccount.findOne({ userId });
  if (!account) throw new Error("Google Agenda não conectada");

  const client = createOAuthClient();
  client.setCredentials({ refresh_token: account.refreshToken });
  return client;
}

export async function criarEvento(req, res) {
  try {
    const auth = await getAuthClient(req.user.id);
    const calendar = google.calendar({ version: "v3", auth });

    const { summary, description, startISO, endISO } = req.body;

    const result = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary,
        description,
        start: { dateTime: startISO },
        end: { dateTime: endISO },
      },
    });

    res.status(201).json(result.data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}
