import React, { useState, useEffect, ChangeEvent} from "react";
import { useFormData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
//import { yupResolver } from "@hookform/resolvers/yup";
//import { useForm } from 'react-hook-form'
import { UploadImage } from "../components/UploadImage";
import type { FormData } from "../../context/UserContext";
import * as yup from "yup";

const schema = yup.object().shape({
  profilePicture: yup.mixed()
    .test('required', "You need to provide a file", (value) =>{
      return value && value.length
    } )
    .test("fileSize", "The file is too large", (value, context) => {
      return value && value[0] && value[0].size <= 2000000;
    })
    .test("type", "We only support jpeg, jpg, png, gif", function (value) {
      return value && (
        value[0] && value[0].type === "image/jpeg"||
        value[0] && value[0].type === "image/jpg"||
        value[0] && value[0].type === "image/png"||
        value[0] && value[0].type === "image/gif"
      );
    }),
});


type UserFormProps = FormData & {
  setFormValues: (fields: Partial<FormData | null>) => void
}

const UserProfileInfo = ({ firstName, lastName, phone, setFormValues}: UserFormProps )  => {

  const maybeString = Math.random() > 0.5 ? 'hello' : null;
  const navigate = useNavigate();
  const { userData } = useFormData()
  /*
  const onSubmit = async (data: any) => {
      /*const formData = new FormData()
      formData.append("file", data.profilePicture[0])
  
      const res = await fetch("http://localhost:8800/picture", {
        method: "POST",
        body: formData
      }).then(res => res.json())
      
      console.log(data)
    }
  */
 /*
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema), 
    defaultValues: userData.profilePicture 
  });
 */
  return (

    <FormWrapper title="Informations sur votre : Profil">
      <h4>Visibles sur votre page personnelle</h4>
      <UploadImage />
      <br />
      <br />
    
      <input
        autoFocus
        required
        type="text"
        placeholder="Nom"
        value={lastName}
        onChange={e => setFormValues({lastName: e.target.value })}
      />
            
      <input
        autoFocus
        required 
        type="text"
        placeholder="Prénom"
        value={firstName}
        onChange={e => setFormValues({ firstName: e.target.value })}
      />
                
      <input 
        type="number" 
        placeholder="Telephone"
        value={phone}
        onChange={e => setFormValues({ phone: e.target.value })}
                   
      />
      <button type="button" onClick={() => navigate("/account")}>Retour</button>
   
      </FormWrapper>
  )
}

export default UserProfileInfo
