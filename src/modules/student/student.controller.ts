import { Request, Response } from 'express';
import { StudentService } from './student.service';
import { StudentDocument } from './student.model';
import { ServiceResponse } from '../../shared/model/index';
import studentValidationSchema from './student.validation';
// import { studentValidationSchema } from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: StudentData } = req.body;

    // Data Validation using zod
    const zodParseData = studentValidationSchema.parse(StudentData);

    // Data Validation using joi
    // const { error, value } = studentValidationSchema.validate(StudentData);
    // if (error) {
    //   res.status(400).json({
    //     message: 'Validation failed',
    //     success: false,
    //     error: error.details,
    //   });
    //   return;
    // }
    // if(value)
    const result: ServiceResponse<StudentDocument> =
      await StudentService.createStudentIntoDB(zodParseData);

    if (!result.success) {
      res.status(401).json({
        message: 'Student creation failed',
        success: false,
        data: [],
      });
    }
    res.status(200).json(result);
    // }
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Something went wrong',
      success: false,
      error,
    });
  }
};

const getStudents = async (req: Request, res: Response) => {
  try {
    const response = await StudentService.getStudents();
    if (response.success) res.status(200).json(response);
    else {
      res.status(404).json(response);
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      data: JSON.stringify(error),
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response: ServiceResponse<StudentDocument> =
      (await StudentService.getStudentById(
        id,
      )) as ServiceResponse<StudentDocument>;
    if (response.success) {
      res.status(200).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      data: error,
    });
  }
};

const deleteStudentById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await StudentService.deleteStudentById(id);
    if (response?.success) {
      res.status(200).json(response);
    } else {
      res.status(404).json(response);
    }
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
      data: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getStudents,
  getStudentById,
  deleteStudentById,
};
