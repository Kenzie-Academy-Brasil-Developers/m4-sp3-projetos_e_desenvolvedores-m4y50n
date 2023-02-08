CREATE DATABASE databasesprint3;

CREATE TABLE IF NOT EXISTS developer_infos (
    id SERIAL;
    "developerSince" DATE NOT NULL;
    "preferedOS" VARCHAR NOT NULL;
);

CREATE TABLE IF NOT EXISTS developers (
    id SERIAL;
    name VARCHAR(50) NOT NULL;
    email VARCHAR(50) NOT NULL;
    "developerInfoID" INT REFERENCES developer_infos("id")
    "developerSince" DATE REFERENCES developer_infos("developerSince");
    "preferedOS" VARCHAR REFERENCES developer_infos("preferedOS");
);

CREATE TABLE IF NOT EXISTS projets (
    id SERIAL;
    name VARCHAR(50) NOT NULL;
    description TEXT NOT NULL;
    "estimatedTime" VARCHAR(20) NOT NULL;
    repository VARCHAR(120) NOT NULL;
    "startDate" DATE NOT NULL;
    "endDate" DATE;
);

CREATE TABLE IF NOT EXISTS technologies (
    id SERIAL;
    name VARCHAR(30) NOT NULL;
    "techList" ARRAY[];
);

CREATE TABLE IF NOT EXISTS projects_technologies (
    id SERIAL;
    "addedIn" DATE NOT NULL;
);

