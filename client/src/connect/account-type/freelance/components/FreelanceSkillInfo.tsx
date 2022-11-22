import React, {useEffect, useState} from "react";
import FormWrapper from "../../../components/FormWrapper";
import {FreelanceExperience} from "./FreelanceExperience";
import GoogleAutoComplete from "../../../components/GoogleAutoComplete";

type UserData = {
    freelanceCurrentJob: string;
    freelanceCity: string;
    freelanceCharges: string;
    freelanceExperience: string;
};

type UserFormProps = UserData & {
    setFormValues: (fields: Partial<UserData>) => void
}

const FreelanceSkillInfo = ({ freelanceCharges, setFormValues }: UserFormProps)  => {
  
  const [data, setData] = useState<any[]>([])
  const getData = () => {

    fetch(`http://localhost:8800/api/auth/freelance-skill`

    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }

    )
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }

  useEffect(()=>{
    
    getData()

  },[])

  interface IData {
    label: string;
    value: string;
    displayOrder: number;
    hidden?: boolean; 
  }

  let handleMetierChange = (e: any) => {
    setFormValues({ freelanceCurrentJob: e.target.value });
  };

  return (

    <FormWrapper title="Informations sur votre : Savoir-faire">
    <h4>Visibles sur votre page professionnel</h4>
      <select onChange={handleMetierChange}>
        <option value=" Votre metier "> -- Select a Skill -- </option>
        {data.map((metier:IData, index) => (
          <option value={metier.value}>{metier.label}</option>
        ))}

      </select>
      
     <FreelanceExperience />

     <GoogleAutoComplete />
      <br />
       
      <input
        autoFocus
        required 
        type="number"
        placeholder="Prix en Euros par jour"
        name="freelanceCharges"
        value={freelanceCharges}  
        onChange={(e) =>
        setFormValues({ freelanceCharges: e.target.value })}
      />    
      </FormWrapper>
        
    )
}

export default FreelanceSkillInfo
