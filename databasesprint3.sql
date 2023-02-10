CREATE DATABASE databasesprint3;

CREATE TYPE os AS ENUM ('windows', 'linux', 'macos');

CREATE TABLE IF NOT EXISTS developer (
    "developerID" SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS developer_infos (
    "developerInfoID" SERIAL PRIMARY KEY,
    "developerSince" DATE NOT NULL,
    "preferredOS" os,
    "developerID" INTEGER UNIQUE,
    FOREIGN KEY ("developerID") REFERENCES developer("developerID") ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project (
    "projectID" SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    "estimatedTime" VARCHAR(20) NOT NULL,
    repository VARCHAR(120) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "developerID" INTEGER NOT NULL,
    FOREIGN KEY ("developerID") REFERENCES developer("developerID") ON DELETE CASCADE
);

INSERT INTO 
	project(name, description, "estimatedTime", repository, "startDate", "developerID")
VALUES
	('Projeto 1', 'projeto full stack', '2 dias', 'url.com.br', '02/13/2023', 1);	
	

CREATE TABLE IF NOT EXISTS technology (
    "techID" SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS project_technology (
    "projectTechID" SERIAL PRIMARY KEY,
    "addedIn" DATE NOT NULL,
    "projectID" INTEGER,
    FOREIGN KEY ("projectID") REFERENCES project("projectID") ON DELETE CASCADE,
    "techID" INTEGER UNIQUE,
    FOREIGN KEY ("techID") REFERENCES technology("techID") ON DELETE CASCADE
);


INSERT INTO 
	project_technology ("addedIn", "projectID", "techID") 
VALUES 
	('02/23/2023', 1, 2);

INSERT INTO 
		technology(name)
VALUES 
		('javascript'),
		('python'),
		('react'),
		('expressjs'),
		('html'),
		('css'),
		('django'),
		('postgresql'),
		('mongodb');


INSERT INTO 
	developer(name, email) 
VALUES 
	('Fabio', 'fabio.jr@kenzie.com.br');

INSERT INTO 
	developer_infos("developerSince", "preferredOS", "developerID") 
VALUES 
	('01/10/2021', 'windows', 1)
