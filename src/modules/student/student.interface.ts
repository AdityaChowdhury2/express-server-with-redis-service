import { Model } from 'mongoose';

export interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  motherName: string;
  motherOccupation: string;
  motherContactNumber: string;
}
export interface ILocalGuardian {
  name: string;
  occupation: string;
  contactNumber: string;
}

export interface IUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export interface IStudent {
  id: string;
  name: IUserName;
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  contactNumber: string;
  emergencyContactNumber: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: IGuardian;
  localGuardian?: ILocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
}

// for creating static methods
export interface StudentModel extends Model<IStudent> {
  isUserExists(id: string): Promise<IStudent | null>;
}

// For creating instance

// export interface StudentMethods {
//   isUserExists(id: string): Promise<IStudent | null>;
// }

// export type StudentModel = Model<
//   IStudent,
//   Record<string, never>,
//   StudentMethods
// >;
