import { app } from "./app.js";
import { env } from "./env/index.js";

app
  .listen({
    port: env.PORT_APP,
  })
  .then(() => {
    console.log(`🚀 Server is running on http://localhost:${env.PORT_APP}`);
  });
