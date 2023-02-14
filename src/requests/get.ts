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
			d.id as "developerID", d.name, d.email, di.id as "developerInfoID", di."developerSince", di."preferredOS"  
		FROM 
			developer d 
		LEFT JOIN 
			developer_infos di  ON d.id = di.id;
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
			d.id as "developerID", d.name, d.email, di.id as "developerInfoID", di."developerSince", di."preferredOS"  
		FROM 
			developer d 
		LEFT JOIN 
			developer_infos di  ON d.id = di.id
        WHERE 
            d.id = $1;
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

const getAllDeveloperProjects = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const id: number = parseInt(request.params.id);

	const queryText: string = `
		SELECT 
			d.id as "developerID", d.name, d.email, di.id as "developerInfoID", 
			di."developerSince", di."preferredOS", p.id as "projectID", p."name" as "projectName", 
			p.description, p."estimatedTime", p.repository, p."startDate", p."endDate", 
			t.id as "techID", t."name" as "techName"
		FROM 
			developer d 
		LEFT JOIN 
			developer_infos di ON d.id = di.id 
		LEFT JOIN 
			project p ON di.id = p."developerID" 
		LEFT JOIN 
			project_technology pt  ON pt."projectID" =  p.id 
		LEFT JOIN 
			technology t ON t.id = pt."techID" 
		WHERE d.id = $1;
    `;

	const queryConfig: QueryConfig = {
		text: queryText,
		values: [id],
	};

	const queryResult: QueryResult<iDeveloperInfos> = await client.query(
		queryConfig
	);

	return response.status(200).json(queryResult.rows);
};

//projects
const getAllProjects = async (
	request: Request,
	response: Response
): Promise<Response> => {
	const queryText: string = `
		SELECT 
			pro.id as "projectID" , pro.name as "projectName", pro.description, pro."estimatedTime", pro.repository, 
			pro."startDate", pro."endDate", pro."developerID", t.id as "techID", t."name" as "techName"  
		FROM 
			project pro
		LEFT JOIN 
			project_technology pt on pro.id = pt.id
		LEFT  JOIN   
			technology t on t.id = pt.id
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
			pro.id as "projectID", pro.name as "projectName", pro.description, pro."estimatedTime", pro.repository, 
			pro."startDate", pro."endDate", pro."developerID", t.id as "techID", t."name" as "techName"  
		FROM 
			project pro
		LEFT JOIN 
			project_technology pt on pro.id = pt.id
		LEFT  JOIN   
			technology t on t.id = pt.id
		WHERE 
			pro.id = $1;
	`;

	const queryConfig: QueryConfig = {
		text: queryText,
		values: [id],
	};

	const queryResult: any = await client.query(queryConfig);

	return response.status(200).json(queryResult.rows);
};

export {
	getAllDevelopers,
	getDeveloper,
	getAllDeveloperProjects,
	getAllProjects,
	getProject,
};
