CREATE DATABASE databasesprint3;

CREATE TYPE os AS ENUM ('windows', 'linux', 'macos');

CREATE TABLE IF NOT EXISTS developer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS developer_infos (
    id SERIAL PRIMARY KEY,
    "developerSince" DATE NOT NULL,
    "preferedOS" os,
    "developerID" INTEGER UNIQUE,
    FOREIGN KEY ("developerID") REFERENCES developer(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    "estimatedTime" VARCHAR(20) NOT NULL,
    repository VARCHAR(120) NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE,
    "developerID" INTEGER UNIQUE,
    FOREIGN KEY ("developerID") REFERENCES developer(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS technologies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE IF NOT EXISTS projects_technologies (
    id SERIAL PRIMARY KEY,
    "addedIn" DATE NOT NULL,
    "projectID" INTEGER UNIQUE,
    FOREIGN KEY ("projectID") REFERENCES projects(id) ON DELETE CASCADE,
    "technologiesID" INTEGER UNIQUE,
    FOREIGN KEY ("technologiesID") REFERENCES technologies(id) ON DELETE CASCADE
);

