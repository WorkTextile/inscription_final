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
        <pre><strong>Email</strong>: {userData.email}</pre>
        <pre><strong>Password: </strong> {userData.password}</pre>
        <pre><strong>First Name:</strong> {userData.firstName}</pre>
        <pre><strong>Last Name:</strong> {userData.lastName}</pre>
        <pre><strong>Telephone:</strong> {userData.telephone}</pre>
        <pre><strong>Account Type:</strong>{userData.accountType}</pre>
        <pre><strong>Client Structure:</strong> {userData.clientStructure}</pre>
        <pre><strong>Usine Structure:</strong>{userData.usineStructure}</pre>
        <pre><strong>Client Brand:</strong>{userData.clientBrand}</pre>
        <pre><strong>Client Job:</strong>{userData.clientJob}</pre>
        <pre><strong>Client City:</strong>{userData.clientCity}</pre>
        <pre><strong>Freelance Current Job:</strong>{userData.freelanceCurrentJob}</pre>
        <pre><strong>Freelance Experience:</strong>{userData.freelanceExperience}</pre>
        <pre><strong>Freelance City:</strong>{userData.freelanceCity}</pre>
        <pre><strong>Freelance Charges:</strong>{userData.freelanceCharges}</pre>
        <pre><strong>Profile Picture:</strong>{userData.profilePicture}</pre>
        
        <button onClick={() => navigate("/")}>Finalisez votre inscription pro</button>
        </>
        
    )
}

export default CompletedInfo;