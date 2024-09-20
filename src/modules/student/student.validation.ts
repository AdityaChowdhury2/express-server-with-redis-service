import { z } from 'zod';

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().trim().min(1, 'Father name is required'),
  fatherOccupation: z.string().trim().min(1, 'Father occupation is required'),
  fatherContactNumber: z.string().min(1, 'Father contact number is required'),
  motherName: z.string().trim().min(1, 'Mother name is required'),
  motherOccupation: z.string().trim().min(1, 'Mother occupation is required'),
  motherContactNumber: z.string().min(1, 'Mother contact number is required'),
});

// Local Guardian Schema
const localGuardianValidationSchema = z.object({
  name: z.string().trim().min(1, 'Local guardian name is required'),
  occupation: z.string().trim().min(1, 'Local guardian occupation is required'),
  contactNumber: z.string().min(1, 'Local guardian contact number is required'),
});

// User Name Schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, 'First name is required')
    .max(20, 'First name must be less than 20 characters')
    .refine((value) => /^[A-Z][a-z]*$/.test(value), {
      message: 'First name must start with a capital letter',
    }),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name is required')
    .max(20, 'Last name must be less than 20 characters')
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name is not a valid name',
    }),
});

// Student Schema
const studentValidationSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  name: userNameValidationSchema,
  email: z
    .string()
    .email({ message: 'Email is not a valid email' })
    .min(1, 'Email is required')
    .trim(),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(20, 'Password must be less than 20 characters'),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: (value) => {
      return { message: `${value} is not a valid gender` };
    },
  }),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  contactNumber: z.string().min(1, 'Contact number is required'),
  emergencyContactNumber: z
    .string()
    .min(1, 'Emergency contact number is required'),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: (value) => {
      return { message: `${value} is not a valid blood group` };
    },
  }),
  presentAddress: z.string().trim().min(1, 'Present address is required'),
  permanentAddress: z.string().trim().min(1, 'Permanent address is required'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().min(1, 'Profile image URL is required'),
  isActive: z.enum(['active', 'blocked'], {
    errorMap: (value) => {
      return { message: `${value} is not a valid status` };
    },
  }),
  isDeleted: z.boolean(),
});

// Export the Zod Schema
export default studentValidationSchema;
