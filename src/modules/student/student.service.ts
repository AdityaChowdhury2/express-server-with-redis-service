import { RedisService } from "../../services/redis.service";
import { ServiceResponse } from "../../shared/model";
import { IStudent } from "./student.interface";
import { StudentDocument, Student } from "./student.model";

const createStudentIntoDB = async (studentData: IStudent) => {
  if (await Student.isUserExists(studentData.id))
    throw new Error("Student already exists");

  const result = await Student.create(studentData);

  // const result = await Student.create(studentData); // built in static method
  // const student = new Student(studentData); // create an instance of the model

  // if (await student.isUserExists(studentData.id)) {
  //   // custom instance method
  //   throw new Error('Student already exists');
  // }

  // const result = await student.save(); // built in instance method
  await RedisService.del("students");

  return {
    success: true,
    message: "Student created successfully",
    result,
  };
};

// FUNCTION To remove new objectId from the response
const convertObjectIdsToStrings = <T>(data: T): T => {
  return JSON.parse(JSON.stringify(data));
};

const getStudents = async () => {
  try {
    const responseFromRedis = await RedisService.get("students");
    let students = responseFromRedis ? JSON.parse(responseFromRedis) : null;
    if (!students) {
      students = await Student.find();
      await RedisService.set(
        "students",
        JSON.stringify(convertObjectIdsToStrings(students))
      );
    }

    return {
      message: "Students fetched successfully",
      data: students,
      success: true,
    };
  } catch (error) {
    return { message: "Internal server error", success: false, error };
  }
};

const getStudentById = async (
  id: string
): Promise<ServiceResponse<StudentDocument | unknown>> => {
  try {
    const key = RedisService.createKey("student", "_id", id);
    const redisResponse = await RedisService.get(key);
    let student = redisResponse ? JSON.parse(redisResponse) : null;
    if (!redisResponse) {
      student = await Student.findById(id).exec();
      await RedisService.set(
        key,
        JSON.stringify(convertObjectIdsToStrings(student)),
        3600
      );
    }
    if (!student) {
      return {
        message: "Student not found",
        data: null,
        success: false,
      };
    }
    return {
      message: "Student fetched successfully",
      data: student,
      success: true,
    };
  } catch (error) {
    return { message: "Internal server error", success: false, error };
  }
};

const deleteStudentById = async (id: string) => {
  try {
    const findById = await Student.findById(id);
    if (!findById) {
      return {
        message: "Student not found",
        success: false,
      };
    }
    const result = await Student.updateOne({ id }, { isDeleted: true });
    if (result.modifiedCount)
      return {
        message: "Student deleted successfully",
        success: true,
        data: result,
      };
    else {
      return {
        message: "Something went wrong",
        success: false,
      };
    }
  } catch (error) {
    return { message: "Internal server error", success: false, error };
  }
};

export const StudentService = {
  createStudentIntoDB,
  getStudents,
  getStudentById,
  deleteStudentById,
};
