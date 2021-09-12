import express, { Application, Request, Response } from "express";
import { createServer as createHttpServer } from 'http'
import cors from 'cors';
import Socket from './third_party/socketServer'

const app: Application = express();
const port = 4000;

app.set("port", port);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*',
}));

app.get(
    "/",
    async (req: Request, res: Response, next): Promise<void> => {
      res.send('Running')
    }
);

const httpServer = createHttpServer(app);

// socket io
const ioServer = Socket(httpServer)

try {
  httpServer.listen(port, (): void => {
      console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
    console.error(`Error occurred: ${error.message}`);
}
