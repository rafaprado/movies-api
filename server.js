require('express-async-errors');
const express = require("express");
const routes = require("./src/routes");
const AppError = require("./src/utils/AppError");
const app = express();
const PORT = 3333;

app.use(express.json());
app.use(routes);

app.use((err, request, response, next) => {

  if(err instanceof AppError) {
    return response.status(err.status).json({
      status: err.status,
      message: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
});

app.listen(PORT, () => console.log(`server is on listening on port ${PORT}`));