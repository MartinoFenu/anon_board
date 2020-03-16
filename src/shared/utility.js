export const checkValidity = ( value, rules ) => {

  if(rules.required) {
    if(value.trim() === '')
      return {
        valid: false,
        errorMessage: 'This field is required and cannot be empty'
      }
  }
  if(rules.minLength) {
    if(value.length < rules.minLength)
      return {
        valid: false,
        errorMessage: `It should be at least ${rules.minLength} characters long`
      }
  }
  if(rules.maxLength) {
    if(value.length > rules.maxLength)
      return {
        valid: false,
        errorMessage: `It should be less than ${rules.maxLength} characters long`
      }
  }
  if(rules.test) {
    if(!rules.test.test(value)) {
      return {
        valid: false,
        errorMessage: rules.fieldError
      }
    }
  }

  return { valid: true };
}
