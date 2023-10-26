import { formValidators } from "../validators/formValidators";

export const registerFormMatchInputs = [

    {
    tag: "Name",
    name: "name",
    type: "text", 
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
  {
    tag: "Players",
    name: "Players",
    type: "Number",
    defaultValue: 2,
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
  {
    tag: "Criterios",
    name: "Criterios",
    type: "text",
    defaultValue: "",
    isRequired: true,
    validators: [formValidators.notEmptyValidator],
  },
];