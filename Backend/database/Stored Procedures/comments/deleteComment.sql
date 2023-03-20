CREATE OR ALTER PROCEDURE uspDeleteComment
    (@id INT)
AS
BEGIN
    DELETE 
    FROM comments
    WHERE id = @id
END