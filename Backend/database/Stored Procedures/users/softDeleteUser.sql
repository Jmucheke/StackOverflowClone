CREATE OR ALTER PROCEDURE uspSoftDeleteUser
    @id INT
AS
BEGIN
    UPDATE Users
    SET isDeleted = 1, updatedAt = GETDATE()
    WHERE id = @id
END