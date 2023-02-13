import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { iDeveloper, iDeveloperInfosID, iInfos, iProject } from "../interfaces";

//developers
const patchDeveloper = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const developerDataKey: Array<string> = Object.keys(request.validatedBody),
		developerDataValues: Array<string> = Object.values(request.validatedBody);

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

	const queryFormat = format(queryText, ...queryValues);

	const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

	const queryResult: QueryResult<iDeveloper> = await client.query(queryConfig);

	const developerInfoID: QueryResult<iDeveloperInfosID> = await client.query({
		text: `
			SELECT d."developerID", d.name, d.email, di."developerInfoID"  FROM developer  d 
			LEFT JOIN developer_infos di ON d."developerID" = di."developerID" WHERE d."developerID" = $1;
			`,
		values: [queryResult.rows[0].developerID],
	});

	return response.status(200).json(developerInfoID.rows[0]);
};

const patchDeveloperInfos = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const developerDataKey: Array<string> = Object.keys(request.validatedBody),
		developerDataValues: Array<string | Date> = Object.values(
			request.validatedBody
		);

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

	const queryFormat = format(queryText, ...queryValues);

	const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

	const queryResult: QueryResult<iInfos> = await client.query(queryConfig);

	const developerInfoID: QueryResult<iDeveloperInfosID> = await client.query({
		text: `
			SELECT d."developerID", di."developerSince", di."preferredOS", di."developerInfoID"  FROM developer  d 
			LEFT JOIN developer_infos di ON d."developerID" = di."developerID" WHERE d."developerID" = $1;
			`,
		values: [queryResult.rows[0].developerID],
	});

	return response.status(200).json(developerInfoID.rows[0]);
};

//project
const patchProject = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const developerDataKey: Array<string> = Object.keys(request.body),
		developerDataValues: Array<string | Date | number> = Object.values(
			request.body
		);

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

	const queryFormat = format(queryText, ...queryValues);

	const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

	const queryResult: QueryResult<iProject> = await client.query(queryConfig);

	return response.status(200).json(queryResult.rows[0]);
};

export { patchDeveloper, patchDeveloperInfos, patchProject };
