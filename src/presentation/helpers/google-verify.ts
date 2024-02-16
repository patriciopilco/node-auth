const {OAuth2Client} = require('google-auth-library');
const {envs} = require('../../config/envs');
const client = new OAuth2Client(envs.GOOGLE_CLIENT_SECRET);

export async function googleVerify(token:string) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: envs.GOOGLE_CLIENT_ID, });
  const payload = ticket.getPayload();
  return payload;
}

