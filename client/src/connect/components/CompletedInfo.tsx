import React from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormData } from '../../context/UserContext';

const CompletedInfo:  React.FC = (): JSX.Element =>{
    const { userData } = useFormData();
    const { handleSubmit } = useForm({ defaultValues: userData });
    const navigate =  useNavigate();

    const submitData = (data: any) => {
        console.info(data);
        // Submit data to the server
    };

    return (
        <>
        <h1>Félicitation 🎉</h1>
        <p className='JSON'>{JSON.stringify(userData)}</p>
        <button onClick={() => navigate("/")}>Finalisez votre inscription pro</button>
        </>
        
    )
}

export default CompletedInfo;