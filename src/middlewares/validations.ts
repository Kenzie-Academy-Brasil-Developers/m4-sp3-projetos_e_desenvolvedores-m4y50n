import { NextFunction, Request, Response } from "express";

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

export { validateKeys };
