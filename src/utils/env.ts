export function getBaseURL() {
  if (import.meta.env.DEV) {
    return 'http://localhost:8080'
  } else {
    return 'https://outcl.im'
  }
}
