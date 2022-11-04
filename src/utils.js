// Helper functions:
export const isOptionSelected = (input) => {
  if (input.value in formFields) {
    return `Please select ${input.value}`;
  }
}

export const stringValidationError = (input) => {
  if (input.value === '') {
    return `Please enter a ${input.name}`;
  }
}

export const isValidEmail = (input) => {
  if (input.value === '') {
    return 'Please enter an email'
  } else if (validateEmail(input.value) === null) {
    return 'Not a valid email address'
  } 
}

export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

// Constants:
export const formFields = {
  name: 'name',
  email: 'email', 
  password: 'password', 
  occupation: 'occupation', 
  state: 'state'
};

export const formFieldValidations = {
  [formFields.name]: stringValidationError,
  [formFields.email]: isValidEmail,
  [formFields.password]: stringValidationError,
  [formFields.occupation]: isOptionSelected,
  [formFields.state]: isOptionSelected,
};
