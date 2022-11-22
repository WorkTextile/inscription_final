import React, { FormEvent } from 'react'
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import UserProfileInfo from '../../profile/UserProfileInfo';
import ClientBrandInfo from './components/ClientBrandInfo';
import { useFormData } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom";
import "../../../styles/globals.css";


const ClientPage = () => {
  const { userData, setFormValues } = useFormData();
  const navigate = useNavigate();
  const { pageNumberSteps, currentStepIndex, currentStepPage, isFirstStep, isLastStep, back, next} = 
    useMultistepForm([
        <UserProfileInfo {...userData} setFormValues={setFormValues}/>,
        <ClientBrandInfo {...userData} setFormValues={setFormValues}/>,
    ]);

    function onSubmit(e: FormEvent) {
      e.preventDefault()
      if (!isLastStep) return next()
      console.log(userData)
      navigate("/completed")
  }

  return (
    <>
        <form onSubmit={onSubmit}>
            <div>{ currentStepIndex + 1 } / { pageNumberSteps.length}</div>
                
            <div>
            { currentStepPage }
                {!isFirstStep && (
                <button type="button" onClick={back}>
                  Retour
                </button>
                )}
           </div>
           <button type="submit" >{isLastStep ? "Terminez" : "Continuez"} </button>
        </form>
        
    </>
  )
}

export default ClientPage;
