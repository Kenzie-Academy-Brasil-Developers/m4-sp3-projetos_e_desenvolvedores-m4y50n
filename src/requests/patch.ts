import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "../database";

//developers
const patchDeveloper = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const developerDataKey: any = Object.keys(request.validatedBody),
		developerDataValues: any = Object.values(request.validatedBody);

	const queryText: string = `
		UPDATE
			developer
		SET
			(%I) = ROW(%L)
		WHERE
			"developerID" = $1
		RETURNING *;
	`;

	const queryValues = [developerDataKey, developerDataValues];

	const queryFormat: any = format(queryText, ...queryValues);

	const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

	const queryResult: any = await client.query(queryConfig);

	return response.status(200).json(queryResult.rows[0]);
};

const patchDeveloperInfos = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const developerDataKey: any = Object.keys(request.validatedBody),
		developerDataValues: any = Object.values(request.validatedBody);

	const queryText: string = `
	UPDATE
		developer_infos
	SET
		(%I) = ROW(%L)
	WHERE
		"developerID" = $1
	RETURNING *;
`;

	const queryValues = [developerDataKey, developerDataValues];

	const queryFormat: any = format(queryText, ...queryValues);

	const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

	const queryResult: any = await client.query(queryConfig);

	return response.status(200).json(queryResult.rows[0]);
};

//project
const patchProject = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const developerDataKey: any = Object.keys(request.validatedBody),
		developerDataValues: any = Object.values(request.validatedBody);

	const queryText: string = `
		UPDATE
			project
		SET
			(%I) = ROW(%L)
		WHERE
			"projectID" = $1
		RETURNING *;
	`;

	const queryValues = [developerDataKey, developerDataValues];

	const queryFormat: any = format(queryText, ...queryValues);

	const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

	const queryResult: any = await client.query(queryConfig);

	return response.status(200).json(queryResult.rows[0]);
};

export { patchDeveloper, patchDeveloperInfos, patchProject };
