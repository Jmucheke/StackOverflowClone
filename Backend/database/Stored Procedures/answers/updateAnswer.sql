-- DROP PROCEDURE IF EXISTS uspUpdateAnswer;

CREATE OR ALTER PROCEDURE uspUpdateAnswer(
    @id INT,
    @description NVARCHAR(1000),
    @code NVARCHAR(1000)
)
AS
BEGIN
    UPDATE answers
        SET
        description = COALESCE(@description, description),
        code = COALESCE(@code, code),
        updatedAt = GETDATE()
        WHERE id = @id;
    SELECT *
    FROM answers
    WHERE id = @id;
END