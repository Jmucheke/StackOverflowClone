-- DROP PROCEDURE IF EXISTS uspUpdateComment;

CREATE OR ALTER PROCEDURE uspUpdateComment(
    @id INT,
    @comment NVARCHAR(1000)
)
AS
BEGIN
    UPDATE comments
        SET
        comment = COALESCE(@comment, comment),
        updatedAt = GETDATE()
        WHERE id = @id;
    SELECT *
    FROM comments
    WHERE id = @id;
END