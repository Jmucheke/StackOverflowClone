CREATE OR ALTER PROCEDURE uspGetQuestionById
    (@id Varchar(100))
AS
BEGIN
    SELECT *
    FROM questions
    WHERE id = @id
END

-- DROP PROCEDURE uspGetQuestionById;