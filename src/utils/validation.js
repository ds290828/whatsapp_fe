import * as Yup from 'yup';

export const signUpSchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .matches(/^[a-zA-Z_ ]*$/, "Name can only contain letters and spaces.") // Removed underscore from the regex
    .min(2, "Name should be between 2 to 20 characters long.")
    .max(20, "Name should be between 2 to 20 characters long."),
  email: Yup.string()
    .required("Email address is required.")
    .email("Invalid email address"),
  status: Yup.string()
    .max(64, "Status must be less than 64 characters."), // Added length for max method
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{6,}$/,
      "Password must contain at least 6 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
    ),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .required("Email address is required.")
    .email("Invalid email address"),
    password: Yup.string()
    .required("Password is required."),
});
