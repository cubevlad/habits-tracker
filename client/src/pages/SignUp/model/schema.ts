import * as yup from 'yup'

export const signUpSchema = yup.object({
  name: yup
    .string()
    .required('should not be empty')
    .min(2, 'must be at least 2 characters long')
    .trim(),
  password: yup
    .string()
    .required('should not be empty')
    .min(4, 'must be at least 2 characters long')
    .max(16, 'max available length is 16')
    .trim(),
  email: yup.string().required('should not be empty').email(),
})
