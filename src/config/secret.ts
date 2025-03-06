import 'dotenv/config'

export const prot = process.env.PORT
export const jwt_secret = process.env.TOKEN_SECRET as string
export const ssl_id = process.env.SSLCOMERCE_ID
export const ssl_password = process.env.SSLCOMERCE_PASSWORD