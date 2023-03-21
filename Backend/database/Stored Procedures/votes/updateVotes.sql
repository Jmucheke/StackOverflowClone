 CREATE OR ALTER PROCEDURE uspUpdateVote
    @id int,
    @votes BIT
    AS
    UPDATE question_votes
    SET votes = @votes
    WHERE id = @id