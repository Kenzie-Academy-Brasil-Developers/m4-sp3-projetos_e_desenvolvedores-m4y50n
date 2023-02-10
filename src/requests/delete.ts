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

export { deleteDeveloper, deleteProject };
