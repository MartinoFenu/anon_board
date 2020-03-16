export const deletePassword = {
  delete_password: {
    type: 'input',
    config: {
      name: 'delete_password',
      placeholder: 'Delete password',
      type: 'password'
    },
    value: '',
    validation: {
      validate: true,
      required: true,
      minLength: 8,
      maxLength: 16,
      test: /^[\w-?&%]*$/,
      fieldError: 'Password must contain alphanumeric charcaters and _%?-& only',
      errorMessage: null,
      valid: false
    },
    touched: false
  }
};

export const login = {
  username: {
    type: 'input',
    config: {
      name: 'username',
      placeholder: 'username',
      type: 'text'
    },
    value: '',
    validation: {
      validate: true,
      required: true,
      errorMessage: null,
      valid: false
    },
    touched: false
  },
  password: {
    type: 'input',
    config: {
      name: 'password',
      placeholder: 'Password',
      type: 'password'
    },
    value: '',
    validation: {
      validate: true,
      required: true,
      errorMessage: null,
      valid: false
    },
    touched: false
  }
};

export const newBoard = {
  name: {
    type: 'input',
    config: {
      name: 'name',
      placeholder: 'Board name',
      type: 'text'
    },
    value: '',
    validation: {
      validate: true,
      required: true,
      minLength: 5,
      test: /^[A-Za-zÀ-ÖØ-öø-ÿ]+[A-Za-zÀ-ÖØ-öø-ÿ\s\d]*$/i,
      fieldError: 'The title must contain only A-Z characters, numbers and spaces',
      errorMessage: null,
      valid: false,
    },
    touched: false
  },
  description: {
    type: 'textarea',
    config: {
      name: 'description',
      type: 'text',
      placeholder: 'Board text'
    },
    value: '',
    validation: {
      validate: true,
      required: true,
      errorMessage: null,
      valid: false
    },
    touched: false
  }
}

export const newReply = {
  text: {
    type: 'textarea',
    config: {
      name: 'text',
      type: 'text',
      placeholder: 'Write a new reply'
    },
    value: '',
    validation: {
      validate: true,
      required: true,
      errorMessage: null,
      valid: false
    },
    touched: false
  },
  delete_password: deletePassword.delete_password
};

export const newThread = {
  title: {
    type: 'input',
    config: {
      name: 'title',
      placeholder: 'Thread title',
      type: 'text'
    },
    value: '',
    validation: {
      validate: true,
      required: true,
      minLength: 5,
      test: /^[A-Za-zÀ-ÖØ-öø-ÿ]+[A-Za-zÀ-ÖØ-öø-ÿ\s\d]*$/i,
      fieldError: 'The title must contain only A-Z characters, numbers and spaces',
      errorMessage: null,
      valid: false,
    },
    touched: false
  },
  text: {
    type: 'textarea',
    config: {
      name: 'text',
      type: 'text',
      placeholder: 'Thread text'
    },
    value: '',
    validation: {
      validate: true,
      required: true,
      errorMessage: null,
      valid: false
    },
    touched: false
  },
  delete_password: deletePassword.delete_password
};
