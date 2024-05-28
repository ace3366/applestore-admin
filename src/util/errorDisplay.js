export default function errorDisplay(validations, inputType) {
  const haveError =
    validations &&
    validations.error &&
    validations.error.find((validate) => validate.path === inputType);
  if (haveError) {
    return haveError.msg;
  }
}
