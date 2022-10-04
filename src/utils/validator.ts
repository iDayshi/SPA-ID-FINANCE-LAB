import shema from '../data/schema.json';

export function validator(data: any, config: any) {
  const errors: any = {};

  function validate(
    validateMethod: string,
    data: string,
    config: { value: string | number; message: string },
    checkPassword: string
  ) {
    let statusValidate;

    switch (validateMethod) {
      case 'isRequired': {
        if (typeof data === 'boolean') {
          statusValidate = !data;
        } else {
          statusValidate = Array.isArray(data)
            ? !data.length
            : data.trim() === '';
        }

        break;
      }
      case 'isEmail': {
        const emailRegExp: RegExp = new RegExp(shema.email.regExp);
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case 'isPhone': {
        const emailRegExp: RegExp = new RegExp(shema.mobilePhone.regExp);
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case 'isCapitalSymbol': {
        const emailRegExp = /[A-Z]+/g;
        statusValidate = !emailRegExp.test(data);
        break;
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(data);
        break;
      }
      case 'min': {
        statusValidate = data.length < config.value;
        break;
      }
      case 'max': {
        statusValidate = data.length > config.value;
        break;
      }
      case 'maxDate': {
        statusValidate = Number(data) > config.value;
        break;
      }
      case 'minDate': {
        statusValidate = Number(data) < config.value;
        break;
      }
      case 'isRepeat': {
        statusValidate = data !== checkPassword;
        break;
      }
      case 'isNumber': {
        statusValidate = isNaN(+data);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod],
        data['password']
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}
