export const ParamsMapToMessages = {
  'needRelog': {
    severity: 'info',
    detail: 'Session has expired. Please, enter your credentials again.'
  },
  'needLogin': {
    severity: 'warn',
    detail: 'Access is denied. Need to login.'
  },
  'invalidCredentials': {
    severity: 'error',
    detail: 'Invalid email or password.'
  }
}
