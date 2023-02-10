import { NextFunction, Request, Response } from "express";

const removeExtraKeys = async (
	request: Request,
	response: Response,
	next: NextFunction
): Promise<Response | void> => {
	const requestPath = request.route.path;

	if (requestPath === "/developers") {
		const { name, email } = request.body;

		request.validatedBody = {
			name,
			email,
		};
	} else if (requestPath === "/developers/:id/infos") {
		const { developerSince, preferredOS } = request.body,
			developerID = parseInt(request.params.id);

		request.validatedBody = {
			developerSince,
			preferredOS,
			developerID,
		};
	} else if (requestPath === "/projects") {
		const {
			name,
			description,
			estimatedTime,
			startDate,
			repository,
			developerID,
		} = request.body;

		request.validatedBody = {
			name,
			description,
			estimatedTime,
			startDate,
			repository,
			developerID,
		};
	} else if (requestPath === "/projects/:id/technologies") {
		const { addedIn, techID } = request.body;

		request.validatedBody = {
			addedIn,
			techID,
		};
	}
	return next();
};

export { removeExtraKeys };
