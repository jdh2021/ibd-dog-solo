
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "dog" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(40) NOT NULL,
  "birthday" DATE NOT NULL,
  "image" VARCHAR(300),
  "user_id" INT REFERENCES "user" NOT NULL
);

CREATE TABLE "symptom" (
  "id" SERIAL PRIMARY KEY,
  "appetite" INT NOT NULL,
  "energy" INT NOT NULL,
  "stomach_pain" INT NOT NULL,
  "vomit" INT NOT NULL,
  "diarrhea" INT NOT NULL,
  "med_given" BOOLEAN DEFAULT FALSE,
  "score" INT,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "dog_id" INT REFERENCES "dog" NOT NULL
);

CREATE TABLE "medication" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(60) NOT NULL,
  "dosage" VARCHAR(20) NOT NULL,
  "frequency" VARCHAR(40) NOT NULL,
  "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
  "active" BOOLEAN DEFAULT TRUE,
  "dog_id" INT REFERENCES "dog" NOT NULL
);