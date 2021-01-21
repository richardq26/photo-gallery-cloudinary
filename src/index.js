// Para leer el .env
// Solo si estoy en desarrollo uso dotenv
if (process.env.NODE_ENV !== 'production') {
  require("dotenv").config();
}

const app = require("./app");

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
  console.log('Environment:', process.env.NODE_ENV)
});
