import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();

const app = express();

app.use(express.json());
app.use(cors());
app.get("/tarefas", async (req: Request, res: Response) => {
  const tarefas = await prisma.task.findMany();
  res.json(tarefas);
});

app.post("/tarefas", async (req: Request, res: Response) => {
  const { desc } = req.body;
  const task = await prisma.task.create({
    data: { desc },
  });
  res.json(task);
});

app.patch("/tarefas/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { desc, termino } = req.body;
  const task = await prisma.task.update({
    where: { id: Number(id) },
    data: { desc, termino },
  });
  res.json(task);
});

app.delete("/tarefas/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const task = await prisma.task.delete({
    where: { id: Number(id) },
  });
  res.json(task);
});

app.listen(3001, () => {
  console.log("Server is listening on port 3001");
});
