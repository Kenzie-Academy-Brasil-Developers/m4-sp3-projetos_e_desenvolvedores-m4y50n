import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";

const validateKeys = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const validKeys = [
		"name",
		"email",
		"description",
		"estimatedTime",
		"startDate",
		"repository",
		"developerID",
		"developerSince",
		"preferredOS",
		"addedIn",
		"techID",
	];

	const { body } = request;

	const keys = Object.keys(body);

	const newBody: any = {};

	keys.forEach((key: any) => {
		if (validKeys.includes(key)) {
			newBody[key] = body[key];
		}
	});

	request.validatedBody = {
		...newBody,
	};

	return next();
};

const verifyId = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const id: number = parseInt(request.params.id);

	const table: string = request.route.path.split("/").filter((i: any) => i)[0];

	let queryText;

	if (table === "developers") {
		queryText = `
			SELECT 
				*
			FROM 
				developer d
			WHERE
				d."developerID" = $1;
		`;
	} else {
		queryText = `
			SELECT 
				*
			FROM 
				project p
			WHERE
				p."projectID" = $1;
		`;
	}

	const queryConfig = {
		text: queryText,
		values: [id],
	};

	const queryResult: QueryResult = await client.query(queryConfig);

	if (!queryResult.rows.length && table === "developers") {
		return response.status(400).json({ message: "Developer not found." });
	} else if (!queryResult.rows.length && table === "projects") {
		return response.status(400).json({ message: "Project not found." });
	}

	return next();
};

const verifyTech = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const name: string = request.params.name;

	const queryText = `
		SELECT 
			"techID" 
		FROM 
			technology
		WHERE name = $1;
	`;

	const querySelectConfig: QueryConfig = {
		text: queryText,
		values: [name],
	};

	const queryResult: any = await client.query(querySelectConfig);

	if (!queryResult.rows[0]) {
		return response.status(400).json({ message: "Tech not found." });
	}

	return next();
};

export { validateKeys, verifyId, verifyTech };
