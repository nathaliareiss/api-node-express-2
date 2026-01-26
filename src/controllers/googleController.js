import { createOAuthClient, SCOPES } from "../config/googleOAuth.js";
import GoogleAccount from "../models/googleAccount.js";

export function connectGoogle(req, res) {
  const userId = req.user.id; 
  


  const client = createOAuthClient();

 

  const url = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: SCOPES,
    state: userId,
  });
  
console.log("Generated Google OAuth URL:", url);
  res.redirect(url);
}

export async function googleCallback(req, res) {
  const { code, state: userId } = req.query;

  const client = createOAuthClient();
  const { tokens } = await client.getToken(code);

  if (tokens.refresh_token) {
    await GoogleAccount.findOneAndUpdate(
      { userId },
      { refreshToken: tokens.refresh_token },
      { upsert: true }
    );
  }

  res.redirect("http://localhost:3000/google/sucesso");
}
