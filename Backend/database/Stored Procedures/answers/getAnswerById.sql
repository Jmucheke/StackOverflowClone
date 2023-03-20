CREATE OR ALTER PROCEDURE uspGetAnswerById
    (@id INT)
AS
BEGIN
    SELECT *
    FROM answers
    WHERE id = @id
END

-- DROP PROCEDURE uspGetAnswerById;