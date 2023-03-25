CREATE OR ALTER PROCEDURE uspDeleteUser
    (@id NVARCHAR(100))
AS
BEGIN
    DELETE 
    FROM users
    WHERE id = @id
END



select * from users;

-- ALTER TABLE questions
-- ADD
-- FOREIGN KEY (userId)
-- REFERENCES users(id)
-- ON DELETE CASCADE;

-- ALTER TABLE questions
-- DROP CONSTRAINT FK__question___userI__14E61A24;

-- ALTER TABLE questions
-- ADD CONSTRAINT FK__question___userI__14E61A24
-- FOREIGN KEY (userId)
-- REFERENCES users (id)
-- ON DELETE NO ACTION;

-- FK__question___userI__14E61A24