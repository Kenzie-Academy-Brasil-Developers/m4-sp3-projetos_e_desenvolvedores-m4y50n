import express, { Application, json } from "express";
import { startDatabase } from "./database";

import * as getRequests from "./requests/get";
import * as postRequests from "./requests/post";
import * as patchRequests from "./requests/patch";
import * as deleteRequests from "./requests/delete";

//call express
const app: Application = express();
app.use(json());

//port
const PORT = 3000;

//Developers requests
app.get("/developers", getRequests.getAllDevelopers);

app.get("/developers/:id", getRequests.getDeveloper);

app.post("/developers", postRequests.postDeveloper);
app.post("/developers/:id/infos", postRequests.postDeveloperInfos);

app.patch("/developers/:id", patchRequests.patchDeveloper);
app.patch("/developers/:id/infos", patchRequests.patchDeveloperInfos);

app.delete("/developers/:id", deleteRequests.deleteDeveloper);

//Projects requests
app.get("/projects", getRequests.getAllProjects);
app.get("/projects/:id", getRequests.getProject);

app.post("/projects", postRequests.postProject);

app.patch("/projects/:id", patchRequests.patchProject);

app.delete("/projects/:id", deleteRequests.deleteProject);

app.listen(PORT, async () => {
	await startDatabase();
	console.log(`Sever is running on port ${PORT}.`);
});
