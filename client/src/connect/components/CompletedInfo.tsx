import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormData } from '../../context/UserContext';

const CompletedInfo:  React.FC = (): JSX.Element =>{
    const { userData } = useFormData();
    const navigate =  useNavigate();
    
    

    return (
        <>
        <h1>Félicitation 🎉</h1>
        <pre>{JSON.stringify(userData, null, 2)}</pre>
        <button onClick={() => navigate("/")}>Finalisez votre inscription pro</button>
        </>
        
    )
}

export default CompletedInfo;