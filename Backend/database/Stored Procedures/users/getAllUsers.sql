-- DROP PROCEDURE IF EXISTS uspGetAllUsers;

CREATE OR ALTER PROCEDURE uspGetAllUsers
AS
BEGIN
    SELECT id, name, email, isAdmin, isDeleted, createdAt, updatedAt
    FROM users
    WHERE isDeleted = 0;
END

select * FROM users;