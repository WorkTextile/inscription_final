import React, {useEffect, useState} from "react";
import FormWrapper from "../../../components/FormWrapper";
import {FreelanceExperience} from "./FreelanceExperience";

type UserData = {
    freelanceCurrentJob: string;
    freelanceCity: string;
    freelanceCharges: string;
    freelanceExperience: string;

};

type UserFormProps = UserData & {
    setFormValues: (fields: Partial<UserData>) => void
}

const FreelanceSkillInfo = ({ freelanceExperience, freelanceCurrentJob, freelanceCity, freelanceCharges, setFormValues }: UserFormProps)  => {
  
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
        <option value="⬇️ Votre metier ⬇️"> -- Select a Skill -- </option>
        {/* Mapping through each select object in our metier array object
          and returning an option element with the appropriate attributes / values.
         */}
        {data.map((metier:IData, index) => (
          <option value={metier.value}>{metier.label}</option>
        ))}

      </select>
      
     <FreelanceExperience />

      <input
        autoFocus
        required 
        type="text"
        placeholder="Ville (Exemple Paris)"
        name="freelanceCity"
        value={freelanceCity}  
        onChange={(e) =>
        setFormValues({ freelanceCity: e.target.value })}
          
      />
       
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
