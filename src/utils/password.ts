import { getBaseURL } from './env'
import { getToken } from './user'

export async function updatePassword(password: string) {
  const token = getToken()
  const formData = {
    password,
  }
  let response

  try {
    response = await fetch(`${getBaseURL()}/api/v1/password`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
  } catch {
    throw new Error('An error occurred. Please try again.')
  }

  if (response.status === 400) {
    const body = await response.json()
    throw new Error(body.error)
  } else if (response.status === 401) {
    throw new Error('Unauthorized')
  } else if (!response.ok) {
    throw new Error('An error occurred. Please try again.')
  }

  try {
    return await response.json()
  } catch {
    throw new Error('An error occurred. Please try again.')
  }
}
