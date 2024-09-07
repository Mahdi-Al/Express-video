import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;
const users = [
  {
    firstName: "Grattan",
    lastName: "Dalton",
    phoneNumber: "495-983-4926",
    role: "Investor Marketing Executive",
    id: 1,
  },
  {
    firstName: "bbbb",
    lastName: "Dalton",
    phoneNumber: "(515) 228-3523 x54693",
    role: "Human Solutions Planner",
    id: 2,
  },
  {
    firstName: "p",
    lastName: "Dalton",
    phoneNumber: "1-429-408-0470",
    role: "Chief Assurance Planner",
    id: 3,
  },
  {
    firstName: "Arno",
    lastName: "Lockman",
    phoneNumber: "869.698.7529 x659",
    role: "International Accounts Administrator",
    id: 4,
  },
  {
    firstName: "Alexie",
    lastName: "Dooley",
    phoneNumber: "492-892-8092 x340",
    role: "National Research Director",
    id: 5,
  },
];
app.get(`/`, (req, res) => {
  res.status(201).send({ msg: "Hello!" });
});
app.get("/api/users", (req, res) => {
  res.status(201).send(users);
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;
  console.log(filter, value);
  if (!filter && !value) {
    return res.send(users);
  }
  if (filter && value) {
    return res.send(users.filter((user) => user[filter].includes(value)));
  }
});
app.get("/api/users/:id", (req, res) => {
  console.log(req.params.id);

  const parseId = parseInt(req.params.id);
  console.log(parseId);
  if (isNaN(parseId))
    return res.status(400).send({ msg: "Bad Request. Invalid ID. " });
  const findUser = users.find((user) => user.id === parseId);
  if (!findUser) return res.sendStatus(404);

  return res.send(findUser);
});
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
