import type { TokenResponse, UserResponse } from '@/types/user'
import type { UseNavigateResult } from '@tanstack/react-router'
import { redirect } from '@tanstack/react-router'
import { getBaseURL } from './env'

export async function fetchSelf(): Promise<UserResponse> {
  const token = getToken()
  let response

  try {
    response = await fetch(`${getBaseURL()}/api/v1/self`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
  } catch {
    throw new Error('An error occurred. Please try again.')
  }

  if (response.status === 401) {
    throw new Error('Unauthorized')
  } else if (response.status === 404) {
    throw new Error('Not Found')
  } else if (!response.ok) {
    throw new Error('An error occurred. Please try again.')
  }

  try {
    return await response.json()
  } catch {
    throw new Error('An error occurred. Please try again.')
  }
}

export async function fetchToken(username: string, password: string): Promise<TokenResponse> {
  try {
    const formData = {
      username,
      password,
    }
    const response = await fetch(`${getBaseURL()}/api/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    if (response.status === 401) {
      throw new Error('Unauthorized')
    } else if (response.status >= 300) {
      throw new Error('An error occurred. Please try again.')
    } else {
      return await response.json()
    }
  } catch {
    throw new Error('An error occurred. Please try again.')
  }
}

export function getToken(required: boolean = true): string {
  const token = localStorage.getItem('token')
  if (!token && required) {
    throw new Error('Unauthorized')
  }
  return token || ''
}

export function logout(navigate?: UseNavigateResult<string>) {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  if (navigate) {
    navigate({ to: '/manage/login' })
  } else {
    throw redirect({ to: '/manage/login' })
  }
}
