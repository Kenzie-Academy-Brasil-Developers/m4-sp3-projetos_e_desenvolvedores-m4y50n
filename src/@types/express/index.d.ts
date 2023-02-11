import * as express from "express";

import { iValidateBody } from "../../interfaces";

declare global {
	namespace Express {
		interface Request {
			validatedBody: iValidateBody;
			techID: string;
		}
	}
}
