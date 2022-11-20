import React from 'react'
import { useForm } from "react-hook-form";
import { useFormData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

type FormValues = {
    accountType: string;
    clientStructure: string;
    usineStructure: string;
}

const AccountTypeInfo: React.FC = (): JSX.Element => {
    
    const { userData, setFormValues } = useFormData();
   
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm<FormValues>({ defaultValues: userData });
    
    const navigate = useNavigate()
    let accountType = watch("accountType")
    let usineStructure = watch("usineStructure")

    const onSubmit = (values: any) => {
        setFormValues(values)
        if ( accountType === "Client") {
            navigate("/client-page")
        } else if ( accountType === "Particulier") {
            navigate('/particular-page')
        } else if ( accountType === "Freelance") {
            navigate("/freelance-page")
        } else if ( usineStructure === "Usine de confection") {
            navigate("/usine-confection")
        } else if ( usineStructure === "Usine de matiére") {
            navigate("/usine-matiere")
        } else if ( usineStructure === "Usine de filature") {
            navigate("/usine-filature")
        } else if ( usineStructure === "Usine de découpe") {
            navigate("/usine-decoupe")
        } else if ( usineStructure === "Usine de accessoires") {
            navigate("/usine-accessoires")
        } else if ( usineStructure === "Atelier Sérigraphie et Broderie") {
        navigate("/usine-atelier-serigraphie-broderie")
    }
         
    }

    return (
        <>
            <form onSubmit={e => e.preventDefault()}>
            <h1>Type de compte</h1>
            <h4>Indiquez votre type de compte utilisateur</h4>
                <label>Type de compte</label>
                <select 
                    {...register("accountType",{ 
                        required: true, maxLength: 27
                    })} >
                    <option value="Quel est votre type de compte ?">Quel est votre type de compte ?</option>
                    <option value="Client">Client</option>
                    <option value="Usine">Usine</option>
                    <option value="Freelance">Freelance</option>
                    <option value="Particulier">Particulier</option>
                </select>
                
                {errors.accountType && errors.accountType.type === "maxLength" && (
                    <p role="alert" className="alert">Please select in item in the list</p>
                )}

                { accountType === "Client" &&
                <>
                <label>Type de structure</label>
                <select {...register("clientStructure",{ 
                        required: true, maxLength: 27
                    })} >
                    <option value="Quel est votre type de structure ?">Quel est votre type de structure ?</option>
                    <option value="Marque">Marque</option>
                    <option value="Entreprise">Entreprise</option>
                    <option value="Association">Association</option>
                    <option value="Collectivité">Collectivité</option>
                    <option value="Institution">Institution</option>
                    <option value="Etudiant">Etudiant</option>
                </select>

                {errors.clientStructure && errors.clientStructure.type === "maxLength" && (
                    <p role="alert" className="alert">Please select in item in the list</p>
                )}
                </>
                }

                { accountType === "Usine" &&
                <>
                <label>Type de structure</label>
                <select {...register("usineStructure" ,{ 
                        required: true, maxLength: 31
                    })} >
                    <option value="Quel est votre type de structure ?">Quel est votre type de structure ?</option>
                    <option value="Usine de confection">Usine de confection</option>
                    <option value="Usine de matiére">Usine de matiére</option>
                    <option value="Usine de filature">Usine de filature</option>
                    <option value="Usine de découpe">Usine de découpe</option>
                    <option value="Usine de accessoires">Usine de accessoires</option>
                    <option value="Atelier Sérigraphie et Broderie">Atelier Sérigraphie et Broderie</option>
                </select>
                {errors.usineStructure && errors.usineStructure.type === "maxLength" && (
                    <p role="alert" className="alert">Please select in item in the list</p>
                )}
                </>

                }
                <button type="submit" onClick={handleSubmit(onSubmit)}>Continuez</button>
                <br />
                <br />
                <button type="button" onClick={() => navigate("/")}>Retour</button>
            </form>
        </>
    )
}

export default AccountTypeInfo;

