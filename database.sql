CREATE TABLE "category" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR (100) NOT NULL
);

CREATE TABLE "favorite" (
    "id" SERIAL PRIMARY KEY,
    "image_url" VARCHAR NOT NULL,
    "title" VARCHAR
);

CREATE TABLE "favorite_category" (
    "id" SERIAL PRIMARY KEY,
    "favorite_id" INT REFERENCES "favorite",
    "category_id" INT REFERENCES "category"
);

-- Default categories. You may change them :)
INSERT INTO "category" ("name")
VALUES ('funny'), ('cohort'), ('cartoon'), ('nsfw'), ('meme');
