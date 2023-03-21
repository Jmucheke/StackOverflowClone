CREATE OR ALTER PROCEDURE uspDeleteUser
    (@id NVARCHAR(100))
AS
BEGIN
    DELETE 
    FROM users
    WHERE id = @id
END