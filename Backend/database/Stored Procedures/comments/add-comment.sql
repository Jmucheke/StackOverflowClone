CREATE OR ALTER PROCEDURE uspAddComment
    @comment VARCHAR(1000),
    @userId VARCHAR(100),
    @answerId VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    -- insert new order item record
    INSERT INTO comments (answerId,comment,userId)
    VALUES (@answerId,@comment,@userId);
END
GO