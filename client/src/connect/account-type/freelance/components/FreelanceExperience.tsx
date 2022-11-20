import React, {useEffect, useState} from "react";
import { useFormData } from "../../../../context/UserContext";

export const FreelanceExperience = ()  => {
  
  const [data, setData] = useState<any[]>([])
  const {setFormValues} = useFormData();
  
  const getData = () => {

    fetch(`http://localhost:8800/api/auth/freelance-experience`

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

  let handleExperienceChange = (e: any) => {
    setFormValues({ freelanceExperience: e.target.value });
  };

  return (
    
    <>
      <select onChange={handleExperienceChange}>
        <option value="⬇️ Votre Experience⬇️"> -- Select a Skill Experience-- </option>
        {/* Mapping through each select object in our experience array object
          and returning an option element with the appropriate attributes / values.
         */}
        {data.map((experience:IData, index) => (
          <option value={experience.value}>{experience.label}</option>
        ))}

      </select>
    </>
    )
}


