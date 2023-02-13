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
	developerID: number;
	name: string;
	email: number;
}

interface iDeveloperInfosID extends iDeveloper {
	developerInfoID: number;
}

interface iInfos {
	developerInfoID: number;
	developerSince: Date;
	preferredOS: string;
	developerID: number;
}

interface iDeveloperInfos extends iDeveloper, iInfos {}

interface iProject {
	projectID: number;
	name: string;
	description: string;
	estimatedTime: Date;
	repository: string;
	startDate: Date;
	endDate: Date;
	developerID: number;
}

interface iTech {
	projectTechID: number;
	addedIn: Date;
	projectID: number;
	techID: number;
}

interface iProjectTech extends iProject, iTech {
	techName: string;
}

export {
	iValidateBody,
	iDeveloper,
	iInfos,
	iDeveloperInfos,
	iProject,
	iTech,
	iDeveloperInfosID,
	iProjectTech,
};
