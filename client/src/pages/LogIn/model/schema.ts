import * as yup from 'yup'

import { VALIDATION_MESSAGES } from '@shared/constants'

export const loginSchema = yup.object({
  name: yup.string().required(VALIDATION_MESSAGES.required).min(2, VALIDATION_MESSAGES.min).trim(),
  password: yup
    .string()
    .required(VALIDATION_MESSAGES.required)
    .min(2, VALIDATION_MESSAGES.min)
    .max(16, VALIDATION_MESSAGES.max)
    .trim(),
})
