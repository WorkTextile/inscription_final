import React, {useState, useEffect} from 'react'
import { useFormData } from '../../../../context/UserContext';

const UsineListTechImpression = () => {

  const [data, setData] = useState<any[]>([])
  const { userData, setFormValues } = useFormData();

  interface IData {
    label: string;
    value: string;
    displayOrder: number;
    hidden?: boolean; 
  }

  const getData = () => {

    fetch(`http://localhost:8800/api/auth/usine-list-technique-impression`

    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }

    )
      .then(function(response){
       
        return response.json();
      })
      .then(function(myJson) {
        
        setData(myJson)
      });
  }

  useEffect(()=>{
    
    getData()

  },[])

  let handleTechniqueChange = (e: any) => {
    setFormValues({ techniqueImpression: e.target.value });
  };

  return (
    <>
      <span>Liste des techniques d'impression *</span>
      <div className="checkbox">
      
      {
        data && data.length > 0 && data.map((technique: IData) => {
          return (
            <div className="checkboxes" key={technique.displayOrder}>
              <label><input type="checkbox" value={userData.techniqueImpression} onChange={ handleTechniqueChange }/> <span>{technique.label}</span></label>
            </div>
          )
        })
      }
      </div>
    </>
  );
}

export default UsineListTechImpression
