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
    name: "players",
    type: "number",
    defaultValue: 2,
    isRequired: true,
    validators: [formValidators.notEmptyValidator, formValidators.rangeValidator],
  },
];