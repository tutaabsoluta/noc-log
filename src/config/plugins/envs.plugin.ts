import 'dotenv/config'
import * as env from 'env-var';

// Read a PORT environment variable and ensure it's a positive integer.
// An EnvVarError will be thrown if the variable is not set, or if it
// is not a positive integer.

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
    MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
    PROD: env.get('PROD').required().asBool(),
}