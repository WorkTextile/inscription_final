import React from 'react'
import { useFormData } from '../../../../context/UserContext';

const QuantityMin = () => {

  const { userData, setFormValues } = useFormData();

  let handleQuantityChange = (e: any) => {
    setFormValues({ quantityMinParColourModele: e.target.value });
  };

  return (
    <>
        <span className='align-header-quantity'>Quantités minimums par couleur/modèle *</span> 
       
        <input 
          type="number"
          placeholder='Quantite minimum exemple 100'
          value={userData.quantityMinParColourModele}
          onChange={ handleQuantityChange }
        />
        <br />
    </>
  );
}

export default QuantityMin
