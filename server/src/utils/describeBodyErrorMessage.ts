import { User } from '../typings/user'

type Errors = {
  fields: Record<string, string>
  isError: boolean
}
/**
 * Function to validate passed or not fields into request body
 * @param model Model with keys to check props
 * @param compareKeys Keys to validate
 */
export const describeBodyErrorMessage = <T = User>(model: T, compareKeys: (keyof T)[]) => {
  const errs: Errors = { fields: {}, isError: false }
  for (const key of compareKeys) {
    const existedValue = model[key as keyof T]
    if (!existedValue) {
      errs.fields = {
        ...errs.fields,
        [key]: 'Not sended in request',
      }
      errs.isError = true
    }
  }
  return errs
}
