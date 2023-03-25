CREATE OR ALTER PROCEDURE uspRegisterUser(
    @id VARCHAR(100),
    @name VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @isAdmin BIT = 0
)
AS
BEGIN
    INSERT INTO users
        (id, name, email, password, isAdmin)
    VALUES
        (@id, @name, @email, @password, @isAdmin);

    SELECT *
    FROM users
    WHERE email = @email;
END

-- DROP PROCEDURE uspRegisterUser;

-- Ensure that there's only one admin in the database
-- ALTER TABLE [users] 
-- ADD CONSTRAINT unique_admin CHECK 
-- (isAdmin = 0 OR (isAdmin = 1 AND (
--     SELECT isAdmin, COUNT() 
--     FROM 
--     [users] 
--     WHERE 
--     isAdmin = 1) = 1));

-- ALTER TABLE [user] ADD CONSTRAINT unique_admin CHECK (isAdmin = 0 OR (isAdmin = 1 AND (SELECT COUNT(*) FROM [user] WHERE isAdmin = 1) = 1));
-- ALTER TABLE [users] ADD CONSTRAINT unique_admin CHECK (isAdmin = 0 OR (isAdmin = 1 AND (SELECT COUNT(*) FROM (SELECT TOP 2 isAdmin FROM [users] WHERE isAdmin = 1) t) = 1));

