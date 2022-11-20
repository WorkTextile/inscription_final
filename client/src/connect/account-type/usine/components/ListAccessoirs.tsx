import React, {useState, useEffect} from 'react'
import FormWrapper from '../../../components/FormWrapper';

const UsineListAccessoirs = () => {

  const [data, setData] = useState<any[]>([])
  
  interface IData {
    label: string;
    value: string;
    displayOrder: number;
    hidden?: boolean; 
  }

  const getData = () => {

    fetch(`http://localhost:8800/api/auth/usine-list-accessoire`

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
      <span>Liste des accessoirs **</span>
      <div className="checkbox">
      
      {
        data && data.length > 0 && data.map((accessoirs: IData) => {
          return (
            <div className="checkboxes" key={accessoirs.displayOrder}>
              <label><input type="checkbox" value={accessoirs.value}/> <span>{accessoirs.label}</span></label>
            </div>
          )
        })
      }
      </div>
    </FormWrapper>
  );
}

export default UsineListAccessoirs
