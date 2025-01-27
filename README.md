

# Project Scripts

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                                        |
| :------------------------ | :-----------------------------------------------------------  |
| `npm install`             | Installs dependencies                                         |
| `npm run dev`             | Starts the development server                                 |
| `npm run build`           | Deletes the `./dist` folder and compiles TypeScript           |
| `npm run start`           | Builds the project and starts server                          |

# Install Env Variables

Before running the project, make sure to set up the environment variables. Create a `.env` file in the root of the project and add the following variables:

```
PORT=

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=
```

Replace the placeholders with the appropriate values for your environment.
