import { Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import { iDeveloper } from "../interfaces";

//developers
const postDeveloper = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const developerDataKey: Array<string> = Object.keys(request.validatedBody),
		developerDataValues: Array<string> = Object.values(request.validatedBody);

	const queryText: string = `
        INSERT INTO  
            developer(%I)
        VALUES
            (%L)
        RETURNING *;
    `;

	const queryValues = [developerDataKey, developerDataValues];

	const queryConfig = format(queryText, ...queryValues);

	const queryResult: QueryResult<iDeveloper> = await client.query(queryConfig);

	return response.status(201).json(queryResult.rows[0]);
};

const postDeveloperInfos = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const developerDataKey: Array<string> = Object.keys(request.validatedBody),
		developerDataValues: Array<string | number> = Object.values(
			request.validatedBody
		);

	const queryText: string = `
		INSERT INTO  
			developer_infos(%I)
		VALUES
			(%L)
		RETURNING *;
	`;

	const queryValues = [developerDataKey, developerDataValues];

	const queryConfig = format(queryText, ...queryValues);

	const queryResult: QueryResult<any> = await client.query(queryConfig);

	return response.status(201).json(queryResult.rows[0]);
};

//projects
const postProject = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const developerDataKey: Array<string> = Object.keys(request.validatedBody),
		developerDataValues: Array<string> = Object.values(request.validatedBody);

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

//technologies
const postTechProject = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const developerDataKey: Array<string> = Object.keys(request.validatedBody),
		developerDataValues: Array<string> = Object.values(request.validatedBody);

	//verify if tech is in project
	const queryVerify: any = await client.query({
		text: `SELECT t."name" from 
		project p
		LEFT JOIN 
		project_technology pt on p."projectID" = pt."projectID"
		LEFT  JOIN   
		technology t on t."techID" = pt."techID"
		WHERE t."techID" = $1;`,
		values: [request.validatedBody.techID],
	});

	if (queryVerify.rows.length) {
		return response.status(409).json({ message: "Tech already in project" });
	}
	////////////

	const queryText: string = `
		INSERT INTO 
			project_technology(%I) 
		VALUES 
			(%L)
		RETURNING *;
	`;

	const queryValues = [
		[...developerDataKey, "projectID"],
		[...developerDataValues, id],
	];

	const queryConfig = format(queryText, ...queryValues);

	const queryResult: any = await client.query(queryConfig);

	return response.status(201).json(queryResult.rows[0]);
};

export { postDeveloper, postDeveloperInfos, postProject, postTechProject };
