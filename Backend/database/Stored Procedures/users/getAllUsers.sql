-- DROP PROCEDURE IF EXISTS usp_GetAllUsers;

CREATE OR ALTER PROCEDURE usp_GetAllUsers
AS
BEGIN
    SELECT id, name, email, isAdmin, isDeleted, createdAt, updatedAt
    FROM users
    WHERE isDeleted = 0;
END

select * FROM users;