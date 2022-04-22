const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
	res.send("Hello World.....hi!");
});

const users = [
	{ id: 1, name: "amir khan", email: "amir.khan@gmail.com" },
	{ id: 2, name: "bappy choudhury", email: "bappy.choudhury@gmail.com" },
	{ id: 3, name: "chonchol choudhury", email: "chonchol.choudhury@gmail.com" },
];

app.get("/users", (req, res) => {
	if (req.query.name) {
		const search = req.query.name.toLocaleLowerCase();
		const matched = users.filter((user) =>
			user.name.toLocaleLowerCase().includes(search)
		);
		res.send(matched);
	} else {
		res.send(users);
	}
});
app.post("/users", (req, res) => {
	console.log(req.body);
	const user = req.body;
	user.id = users.length + 1;
	users.push(user);
	res.send(user);
});
app.get("/users/:id", (req, res) => {
	const id = req.params.id;
	const user = users.find((u) => u.id == id);
	res.send(user);
});

app.listen(port, () => {
	console.log("listening to port", port);
});
