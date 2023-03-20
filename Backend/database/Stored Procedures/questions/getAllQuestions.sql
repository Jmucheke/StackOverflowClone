-- DROP PROCEDURE IF EXISTS uspGetAllQuestions;

CREATE OR ALTER PROCEDURE uspGetAllQuestions
AS
BEGIN
    SELECT *
    FROM questions
END