import React, {useState, useEffect} from 'react'
import UsineListTechImpression from './ListTechImpression';
import QuantityMin from '../../usine/components/QuantityMin';
import FormWrapper from '../../../components/FormWrapper';
import Checkbox  from "../../usine/components/Checkbox";

type UserData = {
  model: [] | any;
  response: [] | any;
};

type UserFormProps = UserData & {
  setFormValues: (fields: Partial<UserData>) => void
}

const UsineDeConfection = ({ model,setFormValues }: UserFormProps) => {

  const [data, setData] = useState<any[]>([])
  const [userinfo, setUserInfo] = useState({
    model: [],
    response: [],
  });
  
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
        return response.json();
      })
      .then(function(myJson) {
        setData(myJson)
      });
  }

  useEffect(()=>{
    
    getData()

  },[])

  let handleMetierChange = (e: any) => {
   

 
      setFormValues({ model: e.target.value});
    

  };
 
  return (
    <FormWrapper title={`Informations sur votre : Production`}>
       <Checkbox />
       <br />
      <span>Modèles en production *</span>
      <div className="checkbox">
      
      {
        data && data.length > 0 && data.map((model: IData) => {
          return (
            <div className="checkboxes" key={model.displayOrder}>
              <label><input type="checkbox" value={model.value} onChange={handleMetierChange}/> <span className='model'>{model.label}</span></label>
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
