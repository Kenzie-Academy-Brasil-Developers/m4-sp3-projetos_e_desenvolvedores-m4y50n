import express, { Application, json, query, Request, Response } from "express";
import { Query, QueryConfig } from "pg";
import format from "pg-format";
import { startDatabase, client } from "./database";

const app: Application = express();
app.use(json());

const PORT = 3000;

//Developers requests
app.get(
	"/developers",
	async (request: Request, response: Response): Promise<Response> => {
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
	}
);

app.get(
	"/developers/:id",
	async (request: Request, response: Response): Promise<Response> => {
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
	}
);

app.post(
	"/developers",
	async (request: Request, response: Response): Promise<Response> => {
		const developerDataKey: any = Object.keys(request.body),
			developerDataValues: any = Object.values(request.body);

		const queryText: string = `
			INSERT INTO  
				developer(%I)
			VALUES
				(%L)
			RETURNING *;
		`;

		const queryValues = [developerDataKey, developerDataValues];

		const queryConfig = format(queryText, ...queryValues);

		const queryResult: any = await client.query(queryConfig);

		return response.status(201).json(queryResult.rows[0]);
	}
);
app.post(
	"/developers/:id/infos",
	async (request: Request, response: Response): Promise<Response> => {
		const developerDataKey: any = Object.keys(request.body),
			developerDataValues: any = Object.values(request.body);

		const queryText: string = `
			INSERT INTO  
				developer_infos(%I)
			VALUES
				(%L)
			RETURNING *;
		`;

		const queryValues = [developerDataKey, developerDataValues];

		const queryConfig = format(queryText, ...queryValues);

		const queryResult: any = await client.query(queryConfig);

		return response.status(201).json(queryResult.rows[0]);
	}
);

app.patch(
	"/developers/:id",
	async (request: Request, response: Response): Promise<Response> => {
		const id: number = parseInt(request.params.id);

		const developerDataKey: any = Object.keys(request.body),
			developerDataValues: any = Object.values(request.body);

		const queryText: string = `
			UPDATE
				developer
			SET
				(%I) = ROW(%L)
			WHERE
				"developerID" = $1
			RETURNING *;
		`;

		const queryValues = [developerDataKey, developerDataValues];

		const queryFormat: any = format(queryText, ...queryValues);

		const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

		const queryResult: any = await client.query(queryConfig);

		return response.status(200).json(queryResult.rows[0]);
	}
);
app.patch(
	"/developers/:id/infos",
	async (request: Request, response: Response): Promise<Response> => {
		const id: number = parseInt(request.params.id);

		const developerDataKey: any = Object.keys(request.body),
			developerDataValues: any = Object.values(request.body);

		const queryText: string = `
		UPDATE
			developer_infos
		SET
			(%I) = ROW(%L)
		WHERE
			"developerID" = $1
		RETURNING *;
	`;

		const queryValues = [developerDataKey, developerDataValues];

		const queryFormat: any = format(queryText, ...queryValues);

		const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

		const queryResult: any = await client.query(queryConfig);

		return response.status(200).json(queryResult.rows[0]);
	}
);

app.delete(
	"/developers/:id",
	async (request: Request, response: Response): Promise<Response> => {
		const id: number = parseInt(request.params.id);

		const queryText: string = `
			DELETE FROM
				developer
			WHERE
				"developerID" = $1;
		`;

		const queryConfig: QueryConfig = { text: queryText, values: [id] };

		const queryResult: any = await client.query(queryConfig);

		return response.status(204).json(queryResult.rows[0]);
	}
);

//Projects requests
app.get(
	"/projects",
	async (request: Request, response: Response): Promise<Response> => {
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
	}
);
app.get(
	"/projects/:id",
	async (request: Request, response: Response): Promise<Response> => {
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
	}
);

app.post(
	"/projects",
	async (request: Request, response: Response): Promise<Response> => {
		const developerDataKey: any = Object.keys(request.body),
			developerDataValues: any = Object.values(request.body);

		const queryText: string = `
			INSERT INTO  
				project(%I)
			VALUES
				(%L)
			RETURNING *;
		`;

		const queryValues = [developerDataKey, developerDataValues];

		const queryConfig = format(queryText, ...queryValues);

		const queryResult: any = await client.query(queryConfig);

		return response.status(201).json(queryResult.rows[0]);
	}
);

app.patch(
	"/projects/:id",
	async (request: Request, response: Response): Promise<Response> => {
		const id: number = parseInt(request.params.id);

		const developerDataKey: any = Object.keys(request.body),
			developerDataValues: any = Object.values(request.body);

		const queryText: string = `
			UPDATE
				project
			SET
				(%I) = ROW(%L)
			WHERE
				"projectID" = $1
			RETURNING *;
		`;

		const queryValues = [developerDataKey, developerDataValues];

		const queryFormat: any = format(queryText, ...queryValues);

		const queryConfig: QueryConfig = { text: queryFormat, values: [id] };

		const queryResult: any = await client.query(queryConfig);

		return response.status(200).json(queryResult.rows[0]);
	}
);

app.delete(
	"/projects/:id",
	async (request: Request, response: Response): Promise<Response> => {
		const id: number = parseInt(request.params.id);

		const queryText: string = `
			DELETE FROM
				project
			WHERE
				"projectID" = $1;
		`;

		const queryConfig: QueryConfig = { text: queryText, values: [id] };

		const queryResult: any = await client.query(queryConfig);

		return response.status(204).json(queryResult.rows[0]);
	}
);

app.listen(PORT, async () => {
	await startDatabase();
	console.log(`Sever is running on port ${PORT}.`);
});
