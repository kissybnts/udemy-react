import { ValidationRule } from '../containers/Checkout/ContactData/ContactData';

export const updateObject = <T>(oldObject: any, updatedProperties: object): T => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidity = (value: string, rule: ValidationRule): boolean => {
  let isValid = true;

  if (rule.required && isValid) {
    isValid = value.trim() !== '';
  }

  if (rule.maxLength && isValid) {
    isValid = value.length <= rule.maxLength;
  }

  if (rule.minLength && isValid) {
    isValid = value.length >= rule.minLength;
  }

  if (rule.isEmail && isValid) {
    const pattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    isValid = pattern.test(value);
  }

  return isValid;
}