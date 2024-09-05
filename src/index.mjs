import { express } from "express";

const app = express();
const PORT = process.env.PORT || 3000;
app.get(`/`, (req, res) => {
  res.status(201).send({ msg: "Hello!" });
});
app.get("/api/users", (req, res) => {});
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
