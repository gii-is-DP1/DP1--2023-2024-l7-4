export const formValidators = {
    notEmptyValidator: {
        validate: (value) => {
            return value.trim().length > 0;
        },
        message: "The field cannot be empty"
    },
    telephoneValidator: {
        validate: (value) => {
            return value.trim().length === 9 && /^\d+$/.test(value);
        },
        message: "The telephone number must be 9 digits long and contain only numbers"
    },
    notNoneTypeValidator: {
        validate: (value) => {
            return value !== "None";
        },
        message: "Please, select a type"
    },
    validPhoneNumberValidator: {
        validate: (value) => {
            return value.trim().length === 9 && /^\d+$/.test(value);
        },
        message: "The phone number must be 9 digits long and contain only numbers"
    },
    rangeValidator: {
        validate: (value) => {
        if (value >= 1 && value <= 4) {
          return true; // La validación pasó, no hay error.
        } else {
          return false;
        }
      }, 
      message: `El valor debe estar entre 1 y 4.`
    }
}