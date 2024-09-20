import {
  Schema,
  Document,
  model,
  CallbackWithoutResultAndOptionalError,
} from "mongoose";
import {
  IGuardian,
  ILocalGuardian,
  IStudent,
  // StudentMethods,
  IUserName,
  StudentModel,
} from "./student.interface";
import validator from "validator";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import config from "../../config";

const guardianSchema = new Schema<IGuardian>({
  fatherName: {
    trim: true,
    type: String,
    required: [true, "Father name is required"],
  },
  fatherOccupation: {
    type: String,
    trim: true,
    required: [true, "Father occupation is required"],
  },
  fatherContactNumber: {
    type: String,
    required: [true, "Father contact number is required"],
  },
  motherName: {
    trim: true,
    type: String,
    required: [true, "Mother name is required"],
  },
  motherOccupation: {
    type: String,
    trim: true,
    required: [true, "Mother occupation is required"],
  },
  motherContactNumber: {
    type: String,
    required: [true, "Mother contact number is required"],
  },
});

const localGuardianSchema = new Schema<ILocalGuardian>({
  name: {
    type: String,
    trim: true,
    required: [true, "Local guardian name is required"],
  },
  occupation: {
    type: String,
    trim: true,
    required: [true, "Local guardian occupation is required"],
  },
  contactNumber: {
    type: String,
    required: [true, "Local guardian contact number is required"],
  },
});

const userNameSchema = new Schema<IUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required"],
    maxlength: [20, "First name must be less than 20 characters"],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return value === firstNameStr;
    //   },
    //   message: '{VALUE} must start with a capital letter',
    // },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    trim: true,
    required: [true, "Last name is required"],
    maxlength: [20, "Last name must be less than 20 characters"],
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not an valid last name',
    // },
  },
});

// export const studentSchema = new Schema<IStudent, StudentModel, StudentMethods>( // For creating instance
export const studentSchema = new Schema<IStudent, StudentModel>(
  {
    // For creating static methods
    id: { type: String, required: [true, "ID is required"], unique: true },
    name: { type: userNameSchema, required: [true, "Name is required"] },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "{VALUE} is not a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: `{VALUE} is not a valid gender`,
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of birth is required"],
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is required"],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, "Emergency contact number is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: `{VALUE} is not a valid blood group`,
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent address is required"],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local guardian information is required"],
    },
    profileImg: {
      type: String,
      required: [true, "Profile image URL is required"],
    },
    isActive: {
      type: String,
      enum: {
        values: ["active", "blocked"],
        message: `{VALUE} is not a valid status`,
      },
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);

// Virtual
studentSchema.virtual("fullName").get(function (this: IStudent) {
  return (
    this.name.firstName + " " + this.name.middleName + " " + this.name.lastName
  );
});

export interface StudentDocument extends IStudent, Document {
  id: string;
}

// pre save middleware /hook
studentSchema.pre(
  "save",
  async function (next: CallbackWithoutResultAndOptionalError) {
    const user = this as StudentDocument;
    user.name.firstName =
      user.name.firstName.charAt(0).toUpperCase() +
      user.name.firstName.slice(1);
    user.name.lastName =
      user.name.lastName.charAt(0).toUpperCase() + user.name.lastName.slice(1);
    user.password = await bcrypt.hash(user.password, +config.bcrypt_salt_round);

    next();
  }
);

// Query middleware
studentSchema.pre(
  "find",
  function (next: CallbackWithoutResultAndOptionalError) {
    next();
  }
);

// post save middleware /hook
studentSchema.post("save", function (doc: StudentDocument, next) {
  // console.log('Post hook : Document saved successfully', this);
  doc.password = "********";

  next();
});

// Creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<IStudent, StudentModel>("Student", studentSchema);
