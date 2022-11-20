import React from 'react'

const QuantityMin = () => {

  return (
    <>
        <span className='align-header-quantity'>Quantités minimums par couleur/modèle *</span> 
       
        <input 
          type="number"
          placeholder='Quantite minimum exemple 100'
        />
        <br />
    </>
  );
}

export default QuantityMin
