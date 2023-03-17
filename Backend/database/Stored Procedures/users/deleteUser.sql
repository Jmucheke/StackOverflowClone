CREATE OR ALTER PROCEDURE uspDeleteUser
    (@id INT)
AS
BEGIN
    DELETE 
    FROM users
    WHERE id = @id
END