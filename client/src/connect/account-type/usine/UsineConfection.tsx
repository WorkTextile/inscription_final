import React,{ FormEvent } from 'react'
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import UserProfileInfo from '../../profile/UserProfileInfo';
import UsineInfo from './components/UsineInfo';
import { useFormData } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom";
import Confection from './components/Confection';

import "../../../styles/globals.css";


const UsineConfection = () => {
  const { userData, setFormValues } = useFormData();
  const navigate = useNavigate();
  const { pageNumberSteps, currentStepIndex, currentStepPage, isFirstStep, isLastStep, back, next} = 
    useMultistepForm([
        <UserProfileInfo {...userData} setFormValues={setFormValues}/>,
        <UsineInfo {...userData} setFormValues={setFormValues}/>,
        <Confection />, 
    ]);

    function onSubmit(e: FormEvent) {
      e.preventDefault()
      if (!isLastStep) return next()
      navigate("/completed")
      console.log(userData)
  }

  return (
    <>
        <form onSubmit={onSubmit}>
          <div>{ currentStepIndex + 1 } / { pageNumberSteps.length}</div>
                
          <div>
            { currentStepPage }
          </div>
          
          <button type="submit" >{isLastStep ? "Terminez" : "Continuez"} </button>
          <div>
          <br />
          <br />
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Retour
            </button>
            )}
          </div>
        </form>
        
    </>
  )
}

export default UsineConfection;
