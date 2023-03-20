CREATE OR ALTER PROCEDURE uspAddQuestion
    @id NVARCHAR(100),
    @title VARCHAR(100),
    @description VARCHAR(1000),
    @code VARCHAR(1000),
    @userId VARCHAR(100),
    @tagName VARCHAR(100)

AS
BEGIN
    SET NOCOUNT ON;

    -- insert new order item record
    INSERT INTO questions (id,title,description,code,userId,tagName)
    VALUES (@id,@title,@description,@code,@userId,@tagName);
END
GO

