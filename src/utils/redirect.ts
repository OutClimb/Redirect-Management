import { getBaseURL } from './env'
import type { RedirectResponse, RedirectsResponse } from '@/types/redirect'
import { getToken } from './user'
import { convertDateToTimestamp } from './date'

export async function createRedirect(
  fromPath: string,
  toUrl: string,
  startsOn: string | undefined,
  stopsOn: string | undefined
): Promise<void> {
  const token = getToken()
  let response

  const requestBody = {
    fromPath,
    toUrl,
    startsOn: 0,
    stopsOn: 0,
  }

  if (startsOn) {
    requestBody.startsOn = convertDateToTimestamp(startsOn)
  }

  if (stopsOn) {
    requestBody.stopsOn = convertDateToTimestamp(stopsOn)
  }

  try {
    response = await fetch(`${getBaseURL()}/api/v1/redirect`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
  } catch {
    throw new Error('An error occurred. Please try again.')
  }

  if (!response.ok) {
    throw new Error('An error occurred. Please try again.')
  }
}

export async function deleteRedirect(id: number): Promise<void> {
  const token = getToken()
  let response

  try {
    response = await fetch(`${getBaseURL()}/api/v1/redirect/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
  } catch {
    throw new Error('An error occurred. Please try again.')
  }

  if (response.status === 404) {
    throw new Error('Not Found')
  } else if (!response.ok) {
    throw new Error('An error occurred. Please try again.')
  }
}

export async function fetchRedirect(id: number): Promise<RedirectResponse> {
  const token = getToken()
  let response

  try {
    response = await fetch(`${getBaseURL()}/api/v1/redirect/${id}`, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
  } catch {
    throw new Error('An error occurred. Please try again.')
  }

  if (response.status === 404) {
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

export async function fetchRedirects(): Promise<RedirectsResponse> {
  const token = getToken()
  let response

  try {
    response = await fetch(`${getBaseURL()}/api/v1/redirect`, {
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
  } else if (!response.ok) {
    throw new Error('An error occurred. Please try again.')
  }

  try {
    return await response.json()
  } catch {
    throw new Error('An error occurred. Please try again.')
  }
}

export async function updateRedirect(
  id: number,
  fromPath: string,
  toUrl: string,
  startsOn: string | undefined,
  stopsOn: string | undefined
): Promise<void> {
  const token = getToken()
  let response

  const requestBody = {
    fromPath,
    toUrl,
    startsOn: 0,
    stopsOn: 0,
  }

  if (startsOn) {
    requestBody.startsOn = convertDateToTimestamp(startsOn)
  }

  if (stopsOn) {
    requestBody.stopsOn = convertDateToTimestamp(stopsOn)
  }

  try {
    response = await fetch(`${getBaseURL()}/api/v1/redirect/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
  } catch {
    throw new Error('An error occurred. Please try again.')
  }

  if (!response.ok) {
    throw new Error('An error occurred. Please try again.')
  }
}
