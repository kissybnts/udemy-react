export const updateObject = <T>(oldObject: any, updatedProperties: object): T => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};