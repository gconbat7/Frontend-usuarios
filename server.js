import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); //Prisma
const app = express(); //Express

app.use(express.json());
app.use(cors());

//---------------MÉTODO GET--------------------
app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
});

//---------------MÉTODO POST-------------------
app.post("/usuarios", async (req, res) => {
  const user = await prisma.user.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
    },
  });

  res.status(201).json(user);
});

//---------------MÉTODO PUT-------------------
app.put("/usuarios/:id", async (req, res) => {
  const user = await prisma.user.update({
    where: {
      id: req.params.id,
    },
    data: {
      email: req.body.email,
      age: req.body.age,
      name: req.body.name,
    },
  });

  res.status(200).json(user);
});

//---------------MÉTODO DELETE-------------------
app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });

  res.status(200).json({ message: "Usuário deletado com sucesso!" });
});

app.listen(3000);

//MONGODB USUÁRIO E SENHA
//User: gildo7
//Password: 1983
