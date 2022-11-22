import React from 'react'
import { useFormData } from '../../../../context/UserContext';

export default function Checkbox() {
 const {userData, setFormValues} = useFormData()

 let surMesure = (e: any) => {
    setFormValues({ Mesure: e.target.value });
};

 let surPublicitaire = (e: any) => {
    setFormValues({ Publicitaire: e.target.value });
};

  return (
    <div>
       <div>
        <input type="checkbox" value= "sur mesure" onChange={ surMesure }/> <span className='model'>Sur Mesure</span>
        <input type="checkbox" value= "sur publicitaire" onChange={ surPublicitaire }/> <span className='model'>Sur Publicitaire</span>
      </div>
    </div>
  )
}
