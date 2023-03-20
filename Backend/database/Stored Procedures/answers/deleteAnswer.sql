CREATE OR ALTER PROCEDURE uspDeleteAnswer
    (@id INT)
AS
BEGIN
    DELETE 
    FROM answers
    WHERE id = @id
END