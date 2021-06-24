//setting u express
const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/users");
const taskRouter = require("./routers/tasks");

const app = express();
//setting up port on heroku or localhost
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
res.status(503).send('server under maintaince');
});
// getting json object parse thorugh postman
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("server is up on port", port);
});
