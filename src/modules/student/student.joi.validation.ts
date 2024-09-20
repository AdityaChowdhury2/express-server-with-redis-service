import Joi from 'joi';
// Creating a schema validation using Joi
// Guardian Schema
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().required().messages({
    'string.base': 'Father name must be a string',
    'string.empty': 'Father name is required',
  }),
  fatherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Father occupation must be a string',
    'string.empty': 'Father occupation is required',
  }),
  fatherContactNumber: Joi.string().required().messages({
    'string.base': 'Father contact number must be a string',
    'string.empty': 'Father contact number is required',
  }),
  motherName: Joi.string().trim().required().messages({
    'string.base': 'Mother name must be a string',
    'string.empty': 'Mother name is required',
  }),
  motherOccupation: Joi.string().trim().required().messages({
    'string.base': 'Mother occupation must be a string',
    'string.empty': 'Mother occupation is required',
  }),
  motherContactNumber: Joi.string().required().messages({
    'string.base': 'Mother contact number must be a string',
    'string.empty': 'Mother contact number is required',
  }),
});

// Local Guardian Schema
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.base': 'Local guardian name must be a string',
    'string.empty': 'Local guardian name is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.base': 'Local guardian occupation must be a string',
    'string.empty': 'Local guardian occupation is required',
  }),
  contactNumber: Joi.string().required().messages({
    'string.base': 'Local guardian contact number must be a string',
    'string.empty': 'Local guardian contact number is required',
  }),
});

// User Name Schema
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      'string.base': 'First name must be a string',
      'string.empty': 'First name is required',
      'string.max': 'First name must be less than 20 characters',
      'string.pattern.base': 'First name must start with a capital letter',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.base': 'Last name must be a string',
      'string.empty': 'Last name is required',
      'string.max': 'Last name must be less than 20 characters',
      'string.pattern.base': 'Last name is not a valid name',
    }),
});

// Student Schema
export const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'string.empty': 'ID is required',
  }),
  name: userNameValidationSchema.required().messages({
    'object.base': 'Name is required and must be a valid object',
  }),
  email: Joi.string().email().trim().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email is not a valid email',
    'string.empty': 'Email is required',
  }),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be one of "male", "female", or "other"',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().required().messages({
    'string.base': 'Date of birth must be a string',
    'string.empty': 'Date of birth is required',
  }),
  contactNumber: Joi.string().required().messages({
    'string.base': 'Contact number must be a string',
    'string.empty': 'Contact number is required',
  }),
  emergencyContactNumber: Joi.string().required().messages({
    'string.base': 'Emergency contact number must be a string',
    'string.empty': 'Emergency contact number is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{VALUE} is not a valid blood group',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.base': 'Present address must be a string',
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.base': 'Permanent address must be a string',
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian information is required',
  }),
  profileImg: Joi.string().uri().required().messages({
    'string.base': 'Profile image URL must be a string',
    'string.empty': 'Profile image URL is required',
    'string.uri': 'Profile image URL must be a valid URL',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{VALUE} is not a valid status',
  }),
});
