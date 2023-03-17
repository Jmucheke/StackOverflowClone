CREATE OR ALTER PROCEDURE uspGetUserById
    (@id Varchar(100))
AS
BEGIN
    SELECT *
    FROM users
    WHERE id = @id
END

-- DROP PROCEDURE uspGetUserById;