import React,{ FormEvent, useState } from 'react'
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import FreelanceSkillInfo from "./components/FreelanceSkillInfo"
import UserProfileInfo from '../../profile/UserProfileInfo';
import { useFormData } from "../../../context/UserContext"
import { useNavigate } from "react-router-dom";
import "../../../styles/globals.css";


const FreelancePage = () => {
  const { userData, setFormValues } = useFormData();
  const [files, setFiles] = useState<File>();
  const navigate = useNavigate();
  const { pageNumberSteps, currentStepIndex, currentStepPage, isFirstStep, isLastStep, back, next} = 
    useMultistepForm([
        <UserProfileInfo
          {...files} 
          files={files}
          setFiles={setFiles} 
          {...userData} 
          setFormValues={setFormValues}
        />,
        <FreelanceSkillInfo {...userData} setFormValues={setFormValues}/>,
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

export default FreelancePage;
