import React, {useState, useEffect} from 'react'
import UsineListTechImpression from './ListTechImpression';
import QuantityMin from '../../freelance/components/QuantityMin';
import FormWrapper from '../../../components/FormWrapper';


const UsineDeConfection = () => {

  const [data, setData] = useState<any[]>([])
  
  interface IData {
    label: string;
    value: string;
    displayOrder: number;
    hidden?: boolean; 
  }

  const getData = () => {

    fetch(`http://localhost:8800/api/auth/usine-de-confection`

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
      <span>Modèles en production *</span>
      <div className="checkbox">
      
      {
        data && data.length > 0 && data.map((model: IData) => {
          return (
            <div className="checkboxes" key={model.displayOrder}>
              <label><input type="checkbox" value={model.value}/> <span className='model'>{model.label}</span></label>
            </div>
          )
        })
      }
      </div>
      <QuantityMin />
      <UsineListTechImpression />
    </FormWrapper>
  );
}

export default UsineDeConfection
