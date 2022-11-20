import React,{ FormEvent } from 'react'
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import UserProfileInfo from '../../profile/UserProfileInfo';
import UsineInfo from './components/UsineInfo';
import { useFormData } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom";
import "../../../styles/globals.css";


const UsineDecoupe = () => {
  const { userData, setFormValues } = useFormData();
  const navigate = useNavigate();
  const { pageNumberSteps, currentStepIndex, currentStepPage, isFirstStep, isLastStep, back, next} = 
    useMultistepForm([
        <UserProfileInfo {...userData} setFormValues={setFormValues}/>,
        <UsineInfo {...userData} setFormValues={setFormValues}/>,
    ]);

    function onSubmit(e: FormEvent) {
      e.preventDefault()
      if (!isLastStep) return next()
      navigate("/completed")
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

export default UsineDecoupe;
