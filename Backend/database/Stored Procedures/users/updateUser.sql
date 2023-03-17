-- DROP PROCEDURE IF EXISTS uspUpdateUser;

CREATE OR ALTER PROCEDURE uspUpdateUser(
    @id NVARCHAR(100),
    @name NVARCHAR(255) = NULL,
    @email NVARCHAR(255) = NULL,
    @password NVARCHAR(255) = NULL,
    @isAdmin BIT = 0,
    @isDeleted BIT = 0
)
AS
BEGIN
    UPDATE users
        SET name = COALESCE(@name, name),
        email = COALESCE(@email, email),
        password = COALESCE(@password, password),
        isAdmin = COALESCE(@isAdmin, isAdmin),
        isDeleted = COALESCE(@isDeleted, isDeleted),
        updatedAt = GETDATE()
        WHERE id = @id;
    SELECT *
    FROM users
    WHERE id = @id;
END