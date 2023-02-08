import express, { Application, json } from "express";

const app: Application = express();
app.use(json());

const PORT = 3000;

app.post("/developers");
app.get("/developers");
app.get("/developers/:id");
app.post("/developers/:id/infos");

app.listen(PORT, () => {
	console.log(`Sever is running on port ${PORT}.`);
});
