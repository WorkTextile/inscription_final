import React, {useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../context/UserContext";
import axios from "axios"


type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp  = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const { userData, setFormValues } = useFormData();
  console.log(userData)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<FormValues>();

  let pwd = watch("password");
  const navigate = useNavigate();

  const verifyUser = async (value: any) => {
    setErrorMessage(false);
    setFormValues(value)
    navigate("/account")
    try {
      const result = await axios.post("http://localhost:8800/api/auth/verifyUser", userData);
      console.log(result.data)
      //navigate("/account")
    }
    catch(error) {
      setErrorMessage(true);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(verifyUser)}>
        <h1>Créer un compte WorkTextile</h1>
        <h4>indiquez vos identifiants de connexion</h4>
        
        <label htmlFor="email">Votre Adresse Email*</label>
        <input
          autoFocus
          type="email"
          placeholder="Votre email adresse"
          {...register('email',{
            required: "Email is required.",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Entered value does not match email format"
            }
          })}

          value={userData.email}
          onChange={e => setFormValues({ email: e.target.value })}
   
        />

        {errors.email && <p role="alert" className="alert">{errors.email.message}</p>}

        <label htmlFor="password">Mot de passe*</label>
        <input
          autoFocus
          type="password"
          placeholder="password"
          {...register("password" ,{
            required: "Password is required.",
            pattern: {
              value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
              message: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
            }
          })}
          value={userData.password}
          onChange={e => setFormValues({ password: e.target.value })}
        />

        {errors.password && <p role="alert" className="alert">{errors.password.message}</p>}
        <label htmlFor="confirmPassword">Confirmation du mot de passe*</label>
        
        <input
          autoFocus
          type="password"
          placeholder="confirm password"
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: value => value === pwd || "The passwords do not match" 
          })} 

          value={userData.confirmPassword}
          onChange={e => setFormValues({ confirmPassword: e.target.value })}
        />

        {errors.confirmPassword && <p role="alert" className="alert">{errors.confirmPassword.message}</p>}

        {
        errorMessage && <div style={{color: `red`}} className="alert"> L'email est déjà utilisé !</div>
        }
        <br />
        <br />

        <input type="submit"/>
      </form>      
    </>  
  );
}

export default SignUp;