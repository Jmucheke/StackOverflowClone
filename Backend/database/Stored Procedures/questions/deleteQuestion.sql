CREATE OR ALTER PROCEDURE uspDeleteQuestion
    (@id NVARCHAR(100))
AS
BEGIN
    DELETE 
    FROM questions
    WHERE id = @id
END