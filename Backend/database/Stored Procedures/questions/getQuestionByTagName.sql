CREATE OR ALTER PROCEDURE uspGetQuestionsByTagName
    (@tagName Varchar(100))
AS
BEGIN
    SELECT *
    FROM questions
    WHERE tagName = @tagName
END

-- DROP PROCEDURE uspGetQuestionsByTagName;