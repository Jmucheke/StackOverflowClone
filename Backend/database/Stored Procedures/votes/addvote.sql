CREATE OR ALTER PROCEDURE uspAddVote
    @votes BIT,
    @userId VARCHAR(100),
    @questionId VARCHAR(100)
AS 
BEGIN
    SET NOCOUNT ON;

    INSERT INTO question_votes (questionId,votes,userId)
    VALUES (@questionId,@votes,@userId);
END
GO