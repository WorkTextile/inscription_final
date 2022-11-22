import React, { FormEvent, useState } from 'react'
import { useMultistepForm } from "../../../hooks/useMultistepForm";
import UserProfileInfo from '../../profile/UserProfileInfo';
import { useFormData } from "../../../context/UserContext"
import { useMutation} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { makeRequest } from '../../../axios';
import "../../../styles/globals.css";

const ParticularPage = () => {
  
  const { userData, setFormValues } = useFormData();
  const maybeString = Math.random() > 0.5 ? 'hello' : null;

  const [files, setFiles] = useState(maybeString ?? '');
  const navigate = useNavigate();

  const { pageNumberSteps, currentStepIndex, currentStepPage, isFirstStep, isLastStep, back, next} = 
    useMultistepForm([
        <UserProfileInfo
          {...userData} 
          setFormValues={setFormValues}
        />,
    ]);

    const upload = async () => {
  
      try {
        const formData = new FormData();
        formData.append("file", files)
        const res = await makeRequest.post("/upload", formData);
        return res.data;
  
      } catch (err) {
        console.log(err);
      }
  };

  const mutation = useMutation(
      (newRegister) => {
        return makeRequest.post("/auth/registerParticular", newRegister);
      }
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!isLastStep) return next()
    console.log(userData)
    let imgUrl = "";
    if (files) imgUrl = await upload();
      mutation.mutate({ ...userData, profilePicture: imgUrl });
      setFiles(maybeString ?? '');
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

export default ParticularPage
