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