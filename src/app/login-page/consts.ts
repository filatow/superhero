export const COMMON_EMAIL_RE = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export const USERNAME_RE = /^[a-z]+[A-Z][a-z]*$|^[A-Z][a-z]* [A-Z][a-z]*$|^[a-z]+\-[a-z]+$/;
export const EMAIL_RE = /^[\da-z]+(\.[\da-z]+){0,3}\@([a-z]{1,5}\.(co|com|net|org|us)$)/;
export const PASSWORD_RE = /^(?=.*\d)(?=.*[A-Z])(?=.*[!$%&\-.])[A-Za-z0-9!$%&\-.]*$/;

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
  },
  'accountWasCreated': {
    severity: 'success',
    detail: 'Account was successfully created. You will be redirected to Login page within 5 seconds...'
  }
}
