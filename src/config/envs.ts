import 'dotenv/config';
import { get } from 'env-var'

export const envs = {
    PORT_APP: get('PORT_APP').required().asPortNumber(),
    MONGO_URL: get('MONGO_URL').required().asString(),
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    GOOGLE_CLIENT_ID: get('GOOGLE_CLIENT_ID').required().asString(),
    GOOGLE_CLIENT_SECRET: get('GOOGLE_CLIENT_SECRET').required().asString(),
}