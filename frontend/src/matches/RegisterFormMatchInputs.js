import { formValidators } from "../validators/formValidators";

export const registerFormMatchInputs = [

    {
    tag: "Name",
    name: "name",
    type: "text", 
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  }
];