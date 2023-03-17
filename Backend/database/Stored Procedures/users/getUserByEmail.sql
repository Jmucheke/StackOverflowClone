CREATE OR ALTER PROCEDURE uspGetUserByEmail
    (@email VARCHAR(255))
AS
BEGIN
    SELECT *
    FROM users
    WHERE email = @email
END