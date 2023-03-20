-- DROP PROCEDURE IF EXISTS uspUpdateQuestion;

CREATE OR ALTER PROCEDURE uspUpdateQuestion(
    @id NVARCHAR(100),
    @title NVARCHAR(255) = NULL,
    @description NVARCHAR(1000) = NULL,
    @code NVARCHAR(1000) = NULL
)
AS
BEGIN
    UPDATE questions
        SET title = COALESCE(@title, title),
        description = COALESCE(@description, description),
        code = COALESCE(@code, code),
        updatedAt = GETDATE()
        WHERE id = @id;
    SELECT *
    FROM questions
    WHERE id = @id;
END