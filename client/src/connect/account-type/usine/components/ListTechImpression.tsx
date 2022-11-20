import React, {useState, useEffect} from 'react'

const UsineListTechImpression = () => {

  const [data, setData] = useState<any[]>([])
  
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
    <>
      <span>Liste des techniques d'impression *</span>
      <div className="checkbox">
      
      {
        data && data.length > 0 && data.map((technique: IData) => {
          return (
            <div className="checkboxes" key={technique.displayOrder}>
              <label><input type="checkbox" value={technique.value}/> <span>{technique.label}</span></label>
            </div>
          )
        })
      }
      </div>
    </>
  );
}

export default UsineListTechImpression
