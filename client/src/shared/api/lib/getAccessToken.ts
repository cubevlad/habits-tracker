type AuthHeadersObject = Record<string, string>

export const getAccessToken = () => localStorage.getItem('local-token')
export const setAccessToken = (token: string) => localStorage.setItem('local-token', token)

export const getAuthHeaders = (): AuthHeadersObject | null => {
  const key = Object.keys(localStorage).find((item) => item.includes('local-token')) ?? ''
  if (!key) {
    return null
  }

  const headersString = localStorage.getItem(key)
  if (!headersString) {
    return null
  }

  try {
    return JSON.parse(headersString)
  } catch (e) {
    return null
  }
}
