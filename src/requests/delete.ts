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

	const queryResult: any = await client.query(queryConfig);

	return response.status(204).json(queryResult.rows[0]);
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

	const queryResult: any = await client.query(queryConfig);

	return response.status(204).json(queryResult.rows[0]);
};

//technologies
const deleteTechProject = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id),
		name: string = request.params.name;

	const querySelectText = `
		SELECT 
			"techID" 
		FROM 
			technology
		WHERE name = $1;
	`;
	const querySelectConfig: QueryConfig = {
		text: querySelectText,
		values: [name],
	};

	const queryResultSelect: any = await client.query(querySelectConfig);

	const [{ techID }] = queryResultSelect.rows;

	const queryText: string = `
		delete from 
			project_technology pt 
		where 
			pt."projectID" = $1 and pt."techID" = $2;
	`;

	const queryConfig: QueryConfig = { text: queryText, values: [id, techID] };

	const queryResult: any = await client.query(queryConfig);

	return response.status(204).json(queryResult.rows[0]);
};

export { deleteDeveloper, deleteProject, deleteTechProject };
