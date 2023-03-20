CREATE OR ALTER PROCEDURE uspGetCommentById
    (@id INT)
AS
BEGIN
    SELECT *
    FROM comments
    WHERE id = @id
END

-- DROP PROCEDURE uspGetCommentById;