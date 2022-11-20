import React, {useState, useEffect} from 'react'
import FormWrapper from '../../../components/FormWrapper';


const UsineMatiere = () => {

  const [data, setData] = useState<any[]>([])
  
  interface IData {
    label: string;
    value: string;
    displayOrder: number;
    hidden?: boolean; 
  }

  const getData = () => {

    fetch(`http://localhost:8800/api/auth/usine-de-matiere`

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

  return (
    <FormWrapper title={`Informations sur votre : Production`}>
      <span>Liste des matières/matériaux disponibles **</span>
      <div className="checkbox">
      
      {
        data && data.length > 0 && data.map((matiere: IData) => {
          return (
            <div className="checkboxes" key={matiere.displayOrder}>
              <label><input type="checkbox" value={matiere.value}/> <span>{matiere.label}</span></label>
            </div>
          )
        })
      }
      </div>
    </FormWrapper>
  );
}

export default UsineMatiere
