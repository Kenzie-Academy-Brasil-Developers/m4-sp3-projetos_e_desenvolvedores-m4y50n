import { Request, Response } from "express";
import { QueryConfig } from "pg";
import { client } from "../database";

//developers
const getAllDevelopers = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const queryText: string = `
        SELECT  
            *
        FROM 
            developer dev
        LEFT JOIN 
            developer_infos dev_infos ON dev."developerID" = dev_infos."developerID";
    `;

	const queryConfig: QueryConfig = {
		text: queryText,
	};

	const queryResult: any = await client.query(queryConfig);

	return response.status(200).json(queryResult.rows);
};

const getDeveloper = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const queryText: string = `
        SELECT  
            *
        FROM 
            developer
        WHERE 
            "developerID" = $1;
    `;

	const queryConfig: QueryConfig = {
		text: queryText,
		values: [id],
	};

	const queryResult: any = await client.query(queryConfig);

	return response.status(200).json(queryResult.rows[0]);
};

//projects
const getAllProjects = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const queryText: string = `
		SELECT 
			pro."projectID", pro.name, pro.description, pro."estimatedTime", pro.repository, 
			pro."startDate", pro."endDate", pro."developerID", t."techID", t."name" as "techName"  
		FROM 
			project pro
		LEFT JOIN 
			project_technology pt on pro."projectID" = pt."projectID"
		LEFT  JOIN   
			technology t on t."techID" = pt."techID"
	`;

	const queryConfig: QueryConfig = {
		text: queryText,
	};

	const queryResult: any = await client.query(queryConfig);

	return response.status(200).json(queryResult.rows);
};

const getProject = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const queryText: string = `
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
			pro."projectID" = $1;
	`;

	const queryConfig: QueryConfig = {
		text: queryText,
		values: [id],
	};

	const queryResult: any = await client.query(queryConfig);

	return response.status(200).json(queryResult.rows);
};

export { getAllDevelopers, getDeveloper, getAllProjects, getProject };
