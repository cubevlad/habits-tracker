import { useCallback, useEffect } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { TextField } from '@mui/material'
import { AxiosError } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { APP_LINKS } from '@app/router/constants'
import { api } from '@shared/api'
import { useAuthCtx } from '@shared/context'
import { StyledForm, StyledFormWrapper, StyledSubmitButton, StyledTitle } from '@styles'

import { DEFAULT_LOGIN_FORM_VALUES, type LoginForm } from './lib'
import { loginSchema } from './model'

export const LoginPage: React.FC = () => {
  const { handleLogin } = useAuthCtx()
  const methods = useForm({
    defaultValues: { ...DEFAULT_LOGIN_FORM_VALUES },
    mode: 'onBlur',
    resolver: yupResolver(loginSchema),
  })

  const {
    reset,
    register,
    formState: { errors, isValid },
    handleSubmit,
    setError,
  } = methods

  const handleSubmitForm = useCallback(
    async (user: LoginForm) => {
      try {
        const resp = await api.userService.user.singIn({ ...user })
        localStorage.setItem('local-token', resp.accessToken)
        handleLogin()
      } catch (error) {
        if (error instanceof AxiosError) {
          setError('name', { message: error.response?.data.message })
          setError('password', { message: error.response?.data.message })
        }
      }
    },
    [setError, handleLogin]
  )

  useEffect(() => {
    reset(DEFAULT_LOGIN_FORM_VALUES)
  }, [reset])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isValid) {
        handleSubmitForm(methods.getValues())
      }
    }

    window.addEventListener('keypress', handleKeyPress)

    return () => {
      window.removeEventListener('keypress', handleKeyPress)
    }
  }, [handleSubmitForm, isValid, methods])

  return (
    <FormProvider {...methods}>
      <StyledFormWrapper>
        <StyledTitle variant='h4'> Добро пожаловать </StyledTitle>
        <StyledForm spacing={4}>
          <TextField
            {...register('name')}
            fullWidth
            error={!isValid && !!errors.name?.message}
            helperText={isValid ? '' : errors.name?.message}
            label='Имя'
            variant='outlined'
          />
          <TextField
            {...register('password')}
            fullWidth
            error={!isValid && !!errors.password?.message}
            helperText={isValid ? '' : errors.password?.message}
            label='Пароль'
            variant='outlined'
          />
          <StyledSubmitButton
            disabled={!isValid}
            sx={{ mt: 2 }}
            type='button'
            variant='outlined'
            onClick={handleSubmit(handleSubmitForm)}
          >
            Войти
          </StyledSubmitButton>
        </StyledForm>
        Нет аккаунта?
        <Link style={{ color: 'unset' }} to={APP_LINKS.SIGNUP}>
          Зарегистрируйтесь
        </Link>
      </StyledFormWrapper>
    </FormProvider>
  )
}
