CREATE OR ALTER PROCEDURE uspAddComment
    @comment VARCHAR(1000),
    @userId VARCHAR(100),
    @answerId VARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO comments (answerId,comment,userId)
    VALUES (@answerId,@comment,@userId);
END
GO