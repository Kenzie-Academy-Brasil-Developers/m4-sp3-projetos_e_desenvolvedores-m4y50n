import { NextFunction, Request, Response } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../database";
import { iValidateBody } from "../interfaces";

//valid keys
const validKeys: string[] = [
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
	],
	validKeysDev: string[] = ["name", "email"],
	validKeysInfos: string[] = ["developerSince", "preferredOS"],
	validKeysProj: string[] = [
		"name",
		"description",
		"estimatedTime",
		"startDate",
		"endDate",
		"repository",
		"developerID",
	],
	validKeysTech: string[] = ["addedIn", "techID"];

//validate keys
const validateKeys = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
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

//verify id
const verifyId = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const id: number = parseInt(request.params.id);

	const table: string = request.route.path.split("/").filter((i: any) => i)[0];

	let queryText: string;

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

//verify tech
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

//verify email
const emailDuplicated = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { body } = request;

	if (body.email) {
		const queryResul: any = await client.query({
			text: "SELECT * FROM developer d WHERE  email = $1",
			values: [body.email],
		});

		if (queryResul.rows.length) {
			return response.status(409).json({ message: "Email already exists." });
		}
	}

	return next();
};

//validate required keys
const validateRequiredDevKeys = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { body, method } = request;

	if (method.toLowerCase() === "post") {
		if (!validKeysDev.every((key: string) => Object.keys(body).includes(key))) {
			return response
				.status(400)
				.json({ message: `Missing required keys: ${validKeysDev.join(", ")}` });
		}
	} else if (method.toLowerCase() === "patch") {
		if (!validKeysDev.some((key: string) => Object.keys(body).includes(key))) {
			return response.status(400).json({
				message: `Send at last one required key: ${validKeysDev.join(", ")}`,
			});
		}
	}

	return next();
};

const validateRequiredInfosKeys = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { body, method } = request;

	if (method.toLowerCase() === "post") {
		if (
			!validKeysInfos.every((key: string) => Object.keys(body).includes(key))
		) {
			return response.status(400).json({
				message: `Missing required keys: ${validKeysInfos.join(", ")}`,
			});
		}
	} else if (method.toLowerCase() === "patch") {
		if (
			!validKeysInfos.some((key: string) => Object.keys(body).includes(key))
		) {
			return response.status(400).json({
				message: `Send at last one required key: ${validKeysInfos.join(", ")}`,
			});
		}
	}

	return next();
};

const validateRequiredProjKeys = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { body, method } = request;

	if (method.toLowerCase() === "post") {
		if (
			!validKeysProj.every((key: string) => Object.keys(body).includes(key))
		) {
			return response.status(400).json({
				message: `Required keys are: ${validKeysProj.join(", ")}`,
			});
		}
	} else if (method.toLowerCase() === "patch") {
		if (!validKeysProj.some((key: string) => Object.keys(body).includes(key))) {
			return response.status(400).json({
				message: `Send at last one required key: ${validKeysProj.join(", ")}`,
			});
		}
	}

	return next();
};

const validateRequiredTechKeys = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const { body } = request;

	if (!validKeysTech.every((key: string) => Object.keys(body).includes(key))) {
		return response.status(400).json({
			message: `Missing required keys: ${validKeysTech.join(", ")}`,
		});
	}

	return next();
};

export {
	validateKeys,
	verifyId,
	verifyTech,
	emailDuplicated,
	validateRequiredDevKeys,
	validateRequiredInfosKeys,
	validateRequiredProjKeys,
	validateRequiredTechKeys,
};
