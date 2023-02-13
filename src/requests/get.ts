import { Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { iDeveloperInfos, iProject } from "../interfaces";

//developers
const getAllDevelopers = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const queryText: string = `
		SELECT  
			d."developerID", d.name, d.email, di."developerInfoID", di."developerSince", di."preferredOS"  
		FROM 
			developer d 
		LEFT JOIN 
			developer_infos di  ON d."developerID" = di."developerID";
    `;

	const queryConfig: QueryConfig = {
		text: queryText,
	};

	const queryResult: QueryResult<iDeveloperInfos[]> = await client.query(
		queryConfig
	);

	return response.status(200).json(queryResult.rows);
};

const getDeveloper = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const queryText: string = `
		SELECT  
			d."developerID", d.name, d.email, di."developerInfoID", di."developerSince", di."preferredOS"  
		FROM 
			developer d 
		LEFT JOIN 
			developer_infos di  ON d."developerID" = di."developerID"
        WHERE 
            d."developerID" = $1;
    `;

	const queryConfig: QueryConfig = {
		text: queryText,
		values: [id],
	};

	const queryResult: QueryResult<iDeveloperInfos> = await client.query(
		queryConfig
	);

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

	const queryResult: QueryResult<iProject> = await client.query(queryConfig);

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
