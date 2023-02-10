import { QueryResult } from "pg";

interface iValidateBody {
	name?: string;
	email?: string;
	developerSince?: string;
	preferredOS?: string;
	developerID?: number;
	description?: string;
	estimatedTime?: Date;
	repository?: string;
	techID?: number;
	addedIn?: string;
	startDate?: Date;
	endDate?: Date;
}

interface iDeveloper {
	id: number;
	name: string;
	email: number;
}

interface iDeveloperInfos extends iDeveloper {
	developerInfoID: number;
	developerSince: Date;
	preferredOS: string;
}

export { iValidateBody, iDeveloper, iDeveloperInfos };
