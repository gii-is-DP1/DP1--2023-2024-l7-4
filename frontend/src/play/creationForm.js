import "../static/css/auth/authButton.css";
import "../static/css/auth/authPage.css";
import FormGenerator from "../components/formGenerator/formGenerator";
import { useEffect, useRef } from "react";
import { registerFormMatchInputs } from "./registerFormMatchInputs";

export default function Register() {
  const creationFormRef = useRef();

  function handleSubmit({ values }) {

    if(!creationFormRef.current.validate()) return;

    const request = values;
    let state = "";

    fetch("/api/v1/matches", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(request),
    })
      .then(function (response) {
        if (response.status === 200) {
          const id = response.id;
          window.location.href = `/play/wait/${id}`;
              }
            })
            .catch((message) => {
              alert(message);
            });
        }

  useEffect(() => {
      });

    return (
    <div className="auth-page-container">
      <h1>Create Match</h1>
      <div className="auth-form-container">
        <FormGenerator
            ref={creationFormRef}
            inputs={
                registerFormMatchInputs
            }
            onSubmit={handleSubmit}
            numberOfColumns={1}
            listenEnterKey
            buttonText="Create Match"
            buttonClassName="auth-button"
          />
        </div>
      </div>
    );
  
}