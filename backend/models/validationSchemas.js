const deletePassword = {
  delete_password: {
    in: ['body'],
    isEmpty: {
      negated: true,
      errorMessage: 'You must enter a valid password'
    },
    isLength: {
      options: {
        min: 8,
        max: 16
      },
      errorMessage: 'Password must be between 8 and 16 characters'
    },
    trim: true,
    custom: {
      options: value => {
        return /^[\w-?&%]*$/.test(value);
      },
      errorMessage: 'Password must contain alphanumeric charcaters and _%?-& only'
    }
  }
};

const text = {
  in: ['body'],
  isEmpty: {
    negated: true
  },
  errorMessage: 'You have to write something in the text area'
}

const newBoardSchema = {
  name: {
    in: ['body'],
    errorMessage: 'Title error',
    trim: true,
    isLength: {
      options: { min: 5 },
      errorMessage: 'Thread title should be at least 5 chracters'
    },
    custom: {
      options: value => {
        return /^[A-Za-zÀ-ÖØ-öø-ÿ]+[A-Za-zÀ-ÖØ-öø-ÿ\s\d]*$/i.test(value);
      },
      errorMessage: 'The title must contain only A-Z characters, numbers and spaces'
    }
  },
  description: text
}

const newThreadSchema = {
  title: {
    in: ['body'],
    errorMessage: 'Title error',
    trim: true,
    isLength: {
      options: { min: 6 },
      errorMessage: 'Thread title should be at least 5 chracters'
    },
    custom: {
      options: value => {
        return /^[A-Za-zÀ-ÖØ-öø-ÿ]+[A-Za-zÀ-ÖØ-öø-ÿ\s\d]*$/i.test(value);
      },
      errorMessage: 'The title must contain only A-Z characters, numbers and spaces'
    }
  },
  text: text,
  delete_password: deletePassword.delete_password
};

const newReplySchema = {
  text: {
    ...text,
    errorMessage: 'You have to write something in the reply body'
  },
  delete_password: deletePassword.delete_password
}

module.exports = {
  deletePassword,
  newThreadSchema,
  newReplySchema,
  newBoardSchema
}
