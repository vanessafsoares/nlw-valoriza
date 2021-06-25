import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";


//@types/express
const app = express();

app.use(express.json()) //especificando json como tipo de envio dos requests da aplicação

app.use(router); //todas as rotas fazem parte do projeto

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  });
})

//http://localhost:3000
app.listen(3000, () => console.log("Server is running"));