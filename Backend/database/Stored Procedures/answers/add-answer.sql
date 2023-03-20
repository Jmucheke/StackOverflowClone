CREATE OR ALTER PROCEDURE uspAddAnswer
    @description VARCHAR(1000),
    @code VARCHAR(1000),
    @userId VARCHAR(100),
    @questionId VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- insert new order item record
    INSERT INTO answers (questionId,description,code,userId)
    VALUES (@questionId,@description,@code,@userId);
END
GO