import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import format from "pg-format";
import { client } from "../database";
import {
	iDeveloper,
	iDeveloperInfosID,
	iInfos,
	iProject,
	iProjectTech,
	iTech,
} from "../interfaces";

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

	const developerInfoID: QueryResult<iDeveloperInfosID> = await client.query({
		text: `
			SELECT d."developerID", d.name, d.email, di."developerInfoID"  FROM developer  d 
			LEFT JOIN developer_infos di ON d."developerID" = di."developerID" WHERE d."developerID" = $1;
			`,
		values: [queryResult.rows[0].developerID],
	});

	return response.status(201).json(developerInfoID.rows[0]);
};

const postDeveloperInfos = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

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

	const queryValues = [
		[...developerDataKey, "developerID"],
		[...developerDataValues, id],
	];

	const queryConfig = format(queryText, ...queryValues);

	const queryResult: QueryResult<iInfos> = await client.query(queryConfig);

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

	const queryResult: QueryResult<iProject> = await client.query(queryConfig);

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
	const queryVerifyName: QueryResult<string[]> = await client.query({
		text: `
		SELECT 
			pro."projectID", pro.name, pro.description, pro."estimatedTime", pro.repository, 
			pro."startDate", pro."endDate", pro."developerID", t."techID", t."name" as "techName"  
		FROM 
			project pro
		LEFT JOIN 
			project_technology pt on pro."projectID" = pt."projectID"
		LEFT  JOIN   
			technology t on t."techID" = pt."techID"
		WHERE 
			t."techID" = $1 and pt."projectID" = $2;`,

		values: [request.validatedBody.techID, id],
	});

	if (queryVerifyName.rows.length) {
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

	await client.query(queryConfig);

	const queryTechInfo: QueryResult<iProjectTech> = await client.query({
		text: `
		SELECT 
			pro."projectID", pro.name, pro.description, pro."estimatedTime", pro.repository, 
			pro."startDate", pro."endDate", pro."developerID", t."techID", t."name" as "techName"  
		FROM 
			project pro
		LEFT JOIN 
			project_technology pt on pro."projectID" = pt."projectID"
		LEFT  JOIN   
			technology t on t."techID" = pt."techID"
		WHERE 
			t."techID" = $1 and pt."projectID" = $2;`,
		values: [request.validatedBody.techID, id],
	});

	return response.status(201).json(queryTechInfo.rows[0]);
};

export { postDeveloper, postDeveloperInfos, postProject, postTechProject };
