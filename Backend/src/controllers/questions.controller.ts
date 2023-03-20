import { questionSchema, updateQestionSchema } from './../helpers/questions.helper';
import { Question } from './../models/questions.model';
import { RequestHandler, Request, Response } from 'express'
import { v4 as uid } from 'uuid'
import Joi from 'joi'
import { DatabaseHelper } from '../databaseHelpers'
import { DecodedData } from '../models/questions.model'
import { User } from '../models/user.model'

const _db = new DatabaseHelper()
interface ExtendedRequest extends Request {
  body: {
    title: string, description: string, code: string, userId: string, tagName:string
  },
  params: { id: string, tagName:string },
  info?: DecodedData
  user?: User
}

// Add Question
export const addQuestion = async (req: ExtendedRequest, res: Response) => {
  try {
    const id = uid()
    // const { Id: userId } = req.user as User 
    const { title, description, code, userId, tagName } = req.body

    const { error } = questionSchema.validate(req.body)

    if (error) {
      return res.status(422).json(error.details[0].message)
    }
    await _db.exec('uspAddQuestion',
      { id, title, description, code, userId, tagName })

    return res.status(201).json({ message: 'Question Added Successfully', id: `${id}` })
  }
  catch (error) {
    return res.status(500).json(error)
  }
}

// Get one question
export const getQuestionById = async (req: ExtendedRequest, res: Response) => {
  const id = req.params.id;
  // const { Id: userId } = req.user as User;

  try {
    const question = await _db.exec("uspGetQuestionById", { id });

    if (question.recordset.length > 0) {
      return res.status(200).json(question.recordset[0]);
    } else {
      return res.status(404).json({ message: "Question not found" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Question
export const updateQuestion = async (req: Request, res: Response) => {

  const id = req.params.id;
  const { title, description, code } = req.body;
  const { error } = updateQestionSchema.validate(req.body)

  try {


    if (error) {
      return res.status(422).json(error.details[0].message)
    }

    const Question = await _db.exec("uspGetQuestionById", { id });

    if (Question.recordset.length > 0) {
      const updatedQuestion = await _db.exec("uspUpdateQuestion", {
        id,
        title,
        description,
        code
      });
      return res.status(200).json({
        message: "Question updated successfully"
        // updatedQuestion: updatedQuestion.recordset[0],
      });
    } else {
      return res.status(404).json({ message: "Question not found" });
    }
  } catch (error: any) {
    // CreateLog.error(error);
    return res.status(500).json({ message: error.message });
  }
};

// Delete Question
export const deleteQuestion = async (req: ExtendedRequest, res: Response) => {

  const id = req.params.id;
  const { title, description, code } = req.body;
  try {
    const Question = await (
      await _db.exec('uspGetQuestionById', { id })
    ).recordset[0]
    if (Question) {
      await _db.exec('uspDeleteQuestion', { id })
      return res.status(200).json({ message: 'Deleted successfully' })
    }
    return res.status(404).json({ error: 'Question Not Found' })
  } catch (error: any) {
    res.status(500).json(error.message)
  }
}

// Get all questions with a particular tag name
export const getQuestionsByTagName = async (req: ExtendedRequest, res: Response) => {
  const tagName = req.params.tagName;

  try {
    const questions = await _db.exec("uspGetQuestionsByTagName", { tagName });

    if (questions.recordset.length > 0) {
      return res.status(200).json(questions.recordset);
    } else {
      return res.status(404).json({ message: "Question not found" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all questions

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const users = await _db.exec("uspGetAllQuestions");

    // returns the users else if ther's none yet an empty array is returned
    return res.status(200).json(users.recordset);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
