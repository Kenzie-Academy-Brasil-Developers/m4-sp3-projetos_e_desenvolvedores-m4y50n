import { Request, Response } from "express";
import format from "pg-format";
import { client } from "../database";

//developers
const postDeveloper = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const developerDataKey: any = Object.keys(request.body),
		developerDataValues: any = Object.values(request.body);

	const queryText: string = `
        INSERT INTO  
            developer(%I)
        VALUES
            (%L)
        RETURNING *;
    `;

	const queryValues = [developerDataKey, developerDataValues];

	const queryConfig = format(queryText, ...queryValues);

	const queryResult: any = await client.query(queryConfig);

	return response.status(201).json(queryResult.rows[0]);
};

const postDeveloperInfos = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const developerDataKey: any = Object.keys(request.body),
		developerDataValues: any = Object.values(request.body);

	const queryText: string = `
		INSERT INTO  
			developer_infos(%I)
		VALUES
			(%L)
		RETURNING *;
	`;

	const queryValues = [developerDataKey, developerDataValues];

	const queryConfig = format(queryText, ...queryValues);

	const queryResult: any = await client.query(queryConfig);

	return response.status(201).json(queryResult.rows[0]);
};

//projects
const postProject = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const developerDataKey: any = Object.keys(request.body),
		developerDataValues: any = Object.values(request.body);

	const queryText: string = `
		INSERT INTO  
			project(%I)
		VALUES
			(%L)
		RETURNING *;
	`;

	const queryValues = [developerDataKey, developerDataValues];

	const queryConfig = format(queryText, ...queryValues);

	const queryResult: any = await client.query(queryConfig);

	return response.status(201).json(queryResult.rows[0]);
};

export { postDeveloper, postDeveloperInfos, postProject };
