import React, { useState, useEffect} from "react";
import { useFormData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import FormWrapper from "../components/FormWrapper";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form'
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

type UserData = {

  lastName: string;
  firstName: string;
  phone: string;
  profilePicture: string;

};

type UserFormProps = UserData & {
  setFormValues: (fields: Partial<UserData>) => void
}

const UserProfileInfo = ({ firstName, lastName, phone, setFormValues}: UserFormProps)  => {

  const navigate = useNavigate();
  const { userData } = useFormData()
  
  const onChangePicture = (e: any) => {
    //setFormValues(URL.createObjectURL(e.target.files[0]));
  };
  
  const onSubmit = async (data: any) => {
      /*const formData = new FormData()
      formData.append("profilePicture", data.profilePicture[0])
  
      const res = await fetch("http://localhost:8800/picture", {
        method: "POST",
        body: formData
      }).then(res => res.json())
      alert(JSON.stringify(res))*/
      console.log(data)
    }
  

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<UserData>({
    resolver: yupResolver(schema), 
    defaultValues: userData.profilePicture 
  });

  return (

    <FormWrapper title="Informations sur votre : Profil">
      <h4>Visibles sur votre page personnelle</h4>

      <img   
          style= {{
            height: "120px",
            width: "120px",
            border: "1px solid #BD1BEE",        
          }}
        />

      <label htmlFor="Image">Profile Picture: </label>
      <input
        type="file"
        {...register('profilePicture')}
        id="select-image"
        onChange={onChangePicture}
      />

      {errors.profilePicture && <p role="alert">{errors.profilePicture.message}</p>}
      
      <button onClick={handleSubmit(onSubmit)}>Submit</button>
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
