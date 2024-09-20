import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

// will call controller function
router.get('/', StudentControllers.getStudents);

router.post('/create-student', StudentControllers.createStudent);

router.get('/:id', StudentControllers.getStudentById);

router.delete('/:id', StudentControllers.deleteStudentById);

export const StudentRoutes = router;
