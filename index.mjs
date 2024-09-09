import express from "express";

const app = express();
app.use(express.json());

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

// Helper function to sort users by firstName
const sortUsersByFirstName = (users) => {
  return users.sort((a, b) => a.firstName.localeCompare(b.firstName));
};

app.get(`/`, (req, res) => {
  res.status(201).send({ msg: "Hello!" });
});

app.get("/api/users", (req, res) => {
  const {
    query: { filter, value, sortBy },
  } = req;

  let result = users;

  if (filter && value) {
    result = result.filter((user) => user[filter].includes(value));
  }

  if (sortBy === "firstName") {
    result = sortUsersByFirstName(result);
  }

  return res.send(result);
});
app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: users[users.length - 1].id + 1, ...body };
  users.push(newUser);
  return res.status(201).send(newUser);
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
app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) {
    return res.sendStatus(400);
  }
  const findUserIndex = users.findIndex((user) => user.id === parseId);

  if (findUserIndex === -1) {
    return res.sendStatus(404);
  }
  users[findUserIndex] = { id: parseId, ...body };
  return res.sendStatus(200);
});
// console.log(users);
app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parseId = parseInt(id);
  if (isNaN(parseId)) {
    return res.sendStatus(400);
  }
  const findUserIndex = users.findIndex((user) => user.id === parseId);

  if (findUserIndex === -1) {
    return res.sendStatus(404);
  }
  users[findUserIndex] = { ...users[findUserIndex], ...body };
  return res.sendStatus(200);
});
app.delete("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  console.log(body);
  console.log(req);
  const parseId = parseInt(id);
  if (isNaN(parseId)) {
    return res.sendStatus(400);
  }
  const findUserIndex = users.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);

  users.splice(findUserIndex, 1);
  return res.sendStatus(200);
});
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
