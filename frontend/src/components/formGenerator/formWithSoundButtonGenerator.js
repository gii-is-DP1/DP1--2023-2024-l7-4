import React, { useState, useImperativeHandle, forwardRef, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import FormInput from "./formInput";
import ButtonWithSound from "../../util/ButtonWithSound";

const FormWithSoundButtonGenerator = forwardRef((props, ref) => {
  const [formValues, setFormValues] = useState({});
  const [submitForm, setSubmitForm] = useState(false);
  const formElement = useRef(null);
  const formInputs = useRef([]);

  useImperativeHandle(ref, () => ({
    validate: () => {
      let isValid = true;
      for (let i = 0; i < props.inputs.length; i++) {
        const input = props.inputs[i];
        for (const validator of input.validators) {
          if (!validator.validate(formValues[input.name])) {
            formInputs.current[i].setErrors([validator.message]);
            isValid = false;
          }
        }
      }
      return isValid;
    },
    updateForm: () => {
      if (Object.keys(formValues).length === 0) {
        const newFormValues = {};
        for (const input of props.inputs) {
          if (input.type === "interval") {
            newFormValues[`min_${input.name}`] = input.min;
            newFormValues[`max_${input.name}`] = input.max;
          } else {
            newFormValues[input.name] = input.defaultValue || "";
          }
        }
        setFormValues(newFormValues);
      }
    }
  }));

  function handleSubmit() {
    const formValuesCopy = {};
    for (let i = 0; i < props.inputs.length; i++) {
      const input = props.inputs[i];
      if (input.type === "files") {
        formValuesCopy[input.name] = formInputs.current[i].files.map(file => file.getFileEncodeBase64String());
      } else if (input.type === "interval") {
        formValuesCopy[`min_${input.name}`] = formInputs.current[i].min;
        formValuesCopy[`max_${input.name}`] = formInputs.current[i].max;
      } else {
        formValuesCopy[input.name] = formInputs.current[i].value;
      }
    }
    setFormValues(formValuesCopy);
    setSubmitForm(true);
  }

  useEffect(() => {
    if (Object.keys(formValues).length === 0) {
      const newFormValues = {};
      for (const input of props.inputs) {
        if (input.type === "interval") {
          newFormValues[`min_${input.name}`] = input.min;
          newFormValues[`max_${input.name}`] = input.max;
        } else {
          newFormValues[input.name] = input.defaultValue || "";
        }
      }
      setFormValues(newFormValues);
    }

    if (props.scrollable) {
      formElement.current.style.overflow = "scroll";
    }
  }, [formValues, props.inputs, props.scrollable]);

  useEffect(() => {
    if (submitForm) {
      props.onSubmit({ values: formValues });
      setSubmitForm(false);
    }
  }, [submitForm]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter" && props.listenEnterKey) {
        handleSubmit();
      }
    };
    document.addEventListener("keyup", handleKeyPress);
    return () => document.removeEventListener("keyup", handleKeyPress);
  }, [props.listenEnterKey]);

  return (
    <div className="class-profile-form">
      <form
        className="class-form"
        ref={formElement}
        style={
          props.numberOfColumns > 1
            ? {
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }
            : {}
        }
      >
        {Object.keys(formValues).length > 0 &&
          props.inputs.map((input, index) => (
            <React.Fragment key={index}>
              {props.childrenPosition !== -1 && index === props.childrenPosition && props.children}
              <FormInput
                tag={input.tag}
                name={input.name}
                type={input.type}
                values={input.values}
                defaultValue={input.defaultValue}
                isRequired={input.isRequired}
                minValue={input.min}
                maxValue={input.max}
                numberOfColumns={props.numberOfColumns}
                validators={input.validators}
                formValues={formValues}
                setFormValues={setFormValues}
                onChange={input?.onChange}
                disabled={input.disabled}
                ref={(input) => (formInputs.current[index] = input)}
              />
            </React.Fragment>
          ))}
        {props.childrenPosition === -1 && props.children}
      </form>
      <ButtonWithSound onClick={handleSubmit} buttonText={props.buttonText} />
    </div>
  );
});

FormWithSoundButtonGenerator.propTypes = {
  inputs: PropTypes.array,
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string,
  buttonClassName: PropTypes.string,
  numberOfColumns: PropTypes.number,
  childrenPosition: PropTypes.number,
  listenEnterKey: PropTypes.bool,
  scrollable: PropTypes.bool
};

FormWithSoundButtonGenerator.defaultProps = {
  inputs: [],
  onSubmit: () => {},
  buttonText: "Submit",
  buttonClassName: "",
  numberOfColumns: 1,
  childrenPosition: 0,
  listenEnterKey: false,
  scrollable: false
};

export default FormWithSoundButtonGenerator;
