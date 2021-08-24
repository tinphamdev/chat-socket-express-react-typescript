import express, { Application, Request, Response } from "express";
import cors from 'cors';
import { Socket } from "socket.io";

const app: Application = express();
const port = 4000;

app.set("port", port);

const server = require("http").Server(app);

const io = require("socket.io")(server, { allowEIO3: true });

io.use((socket: any, next: any) => {
  const username = socket.handshake.auth.username;

  console.log(`username socket`, username)

  if (!username) {
    return next(new Error("invalid username"));
  }

  socket.username = username;

  next();
});



// Body parsing Middleware\
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: '*'
}));

app.get(
    "/",
    async (req: Request, res: Response, next): Promise<void> => {
      // const fileName = 'src/views/dashboard.html';
      // res.sendFile(fileName, { root: '.' } , function (err) {
      //     if (err) {
      //         next(err);
      //     } else {
      //         console.log('Sent:', fileName);
      //     }
      // });
      res.send('Huy Dau Cut')
    }
);

app.get(
  "/chats",
  async (req: Request, res: Response, next): Promise<void> => {
      
    const fileName = 'src/views/index.html';
    res.sendFile(fileName, { root: '.' } , function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
  }
);

// socket io

io.on("connection", function(socket: Socket) {
  console.log("new client connected");

  socket.on('newMessage', (newMessage: string) => {
    console.log(`${newMessage}`)

    socket.emit('huyngu', { level: 'max' })
  })
});


try {
  server.listen(port, (): void => {
        console.log(`Connected successfully on port ${port}`);
    });
} catch (error) {
    console.error(`Error occured: ${error.message}`);
}
