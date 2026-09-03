export const REGISTRATION_NUMBER_FORMATS = {
  BUK_STUDENT: {
    regex: /^[A-Z]{2,5}\/\d{2}\/[A-Z]{2,5}\/\d{5}$/,
    example: 'CST/23/IFT/00000',
    label: 'Bayero University Kano (BUK) student format',
  },
};

export function validateRegistrationNumber(
  value,
  formatKey = 'BUK_STUDENT'
) {
  const format = REGISTRATION_NUMBER_FORMATS[formatKey];

  if (!format) {
    return {
      valid: false,
      error: `Unknown registration number format: "${formatKey}".`,
      value: '',
    };
  }

  const trimmed =
    typeof value === 'string'
      ? value.trim()
      : '';

  if (!trimmed) {
    return {
      valid: false,
      error: 'Registration number is required.',
      value: trimmed,
    };
  }

  if (!format.regex.test(trimmed)) {
    return {
      valid: false,
      error: `Enter a valid registration number (e.g. ${format.example}).`,
      value: trimmed,
    };
  }

  return {
    valid: true,
    error: null,
    value: trimmed,
  };
}

export function validateRequired(
  value,
  label = 'This field'
) {
  const trimmed =
    typeof value === 'string'
      ? value.trim()
      : '';

  if (!trimmed) {
    return {
      valid: false,
      error: `${label} is required.`,
      value: trimmed,
    };
  }

  return {
    valid: true,
    error: null,
    value: trimmed,
  };
}

export function validatePasswordPresence(value) {
  if (!value || value.length === 0) {
    return {
      valid: false,
      error: 'Password is required.',
    };
  }

  return {
    valid: true,
    error: null,
  };
}

export function validatePasswordStrength(value) {
  const password = value || '';
  const unmet = [];

  if (password.length < 8) {
    unmet.push('At least 8 characters');
  }

  if (!/[A-Z]/.test(password)) {
    unmet.push('At least one uppercase letter');
  }

  if (!/[a-z]/.test(password)) {
    unmet.push('At least one lowercase letter');
  }

  if (!/[0-9]/.test(password)) {
    unmet.push('At least one number');
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    unmet.push('At least one special character');
  }

  return {
    valid: unmet.length === 0,
    unmet,
  };
}

export function validatePasswordsMatch(
  password,
  confirmPassword
) {
  if (password !== confirmPassword) {
    return {
      valid: false,
      error: 'Passwords do not match.',
    };
  }

  return {
    valid: true,
    error: null,
  };
}

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(value) {
  const trimmed =
    typeof value === 'string'
      ? value.trim()
      : '';

  if (!trimmed) {
    return {
      valid: false,
      error: 'Email is required.',
      value: trimmed,
    };
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return {
      valid: false,
      error: 'Enter a valid email address.',
      value: trimmed,
    };
  }

  return {
    valid: true,
    error: null,
    value: trimmed.toLowerCase(),
  };
}