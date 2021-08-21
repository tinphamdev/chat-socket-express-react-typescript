# NestJS Live stream use socket

# Namespace is a communication channel that allows you to split the logic of your application over a single shared connection

`
io.of("/orders").on("connection", (socket) => {
  socket.on("order:list", () => {});
  socket.on("order:create", () => {});
});

io.of("/users").on("connection", (socket) => {
  socket.on("user:list", () => {});
});
`

- refer to https://socket.io/docs/v4/namespaces/
