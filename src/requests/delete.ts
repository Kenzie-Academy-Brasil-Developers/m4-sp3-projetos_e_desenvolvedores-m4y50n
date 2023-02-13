import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";

//developers
const deleteDeveloper = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const queryText: string = `
		DELETE FROM
			developer
		WHERE
			"developerID" = $1;
	`;

	const queryConfig: QueryConfig = { text: queryText, values: [id] };

	await client.query(queryConfig);

	return response.status(204).send();
};

//project
const deleteProject = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const queryText: string = `
		DELETE FROM
			project
		WHERE
			"projectID" = $1;
	`;

	const queryConfig: QueryConfig = { text: queryText, values: [id] };

	await client.query(queryConfig);

	return response.status(204).send();
};

//technologies
const deleteTechProject = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id),
		techID: number = parseInt(request.techID);

	const queryText: string = `
		delete from 
			project_technology pt 
		where 
			pt."projectID" = $1 and pt."techID" = $2;
	`;

	const queryConfig: QueryConfig = {
		text: queryText,
		values: [id, techID],
	};

	await client.query(queryConfig);

	return response.status(204).send();
};

export { deleteDeveloper, deleteProject, deleteTechProject };
