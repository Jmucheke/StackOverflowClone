CREATE OR ALTER PROCEDURE uspGetQuestionsByUser
    (@userId Varchar(100))
AS
BEGIN
    SELECT *
    FROM questions
    WHERE userId = @userId
END

-- DROP PROCEDURE uspGetQuestionById;
