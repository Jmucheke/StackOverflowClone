CREATE PROCEDURE sp_DeleteTableAndDependencies 
  @questions NVARCHAR(100)
AS
BEGIN
  SET NOCOUNT ON;

  DECLARE @tableCount INT = 0;
  DECLARE @fkCount INT = 0;

  -- Check if the table exists
  IF OBJECT_ID(@questions, 'U') IS NULL
  BEGIN
    PRINT 'Table ' + @questions + ' does not exist';
    RETURN;
  END;

  -- Get the count of foreign keys referencing the table
  SELECT @fkCount = COUNT(*) 
  FROM sys.foreign_keys
  WHERE referenced_object_id = OBJECT_ID(@questions);

  -- Drop foreign keys referencing the table
  IF @fkCount > 0
  BEGIN
    DECLARE @fkName NVARCHAR(100);
    DECLARE @fkSql NVARCHAR(MAX) = '';

    DECLARE fk_cursor CURSOR FOR 
    SELECT name
    FROM sys.foreign_keys
    WHERE referenced_object_id = OBJECT_ID(@questions);

    OPEN fk_cursor;

    FETCH NEXT FROM fk_cursor INTO @fkName;

    WHILE @@FETCH_STATUS = 0
    BEGIN
      SET @fkSql += 'ALTER TABLE ' + OBJECT_SCHEMA_NAME(id) + '.' + OBJECT_NAME(answer_Id) 
                   + ' DROP CONSTRAINT ' + @fkName + '; ';
      FETCH NEXT FROM fk_cursor INTO @fkName;
    END;

    CLOSE fk_cursor;
    DEALLOCATE fk_cursor;

    EXEC(@fkSql);
  END;

  -- Get the count of tables referencing the table
  SELECT @tableCount = COUNT(*) 
  FROM sys.tables 
  WHERE OBJECT_DEFINITION(OBJECT_ID) LIKE '%' + @questions + '%';

  -- Drop tables referencing the table
  IF @tableCount > 0
  BEGIN
    DECLARE @tableSql NVARCHAR(MAX) = '';

    SELECT @tableSql += 'DROP TABLE ' + name + '; '
    FROM sys.tables 
    WHERE OBJECT_DEFINITION(OBJECT_ID) LIKE '%' + @questions + '%';

    EXEC(@tableSql);
  END;

  -- Drop the table
  DROP TABLE IF EXISTS @questions;

  PRINT 'Table ' + @questions + ' and its dependencies have been deleted';
END;
