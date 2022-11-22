import React, { createContext, useState, useContext } from "react"

export type FormData  = {
    email: string;
    password: string;
    confirmPassword: string;
    accountType: string;
    lastName: string;
    firstName: string;
    phone: string;
    profilePicture: string;
  
    
}

const INITIAL_DATA: FormData = {
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    lastName: "",
    firstName: "",
    phone: "",
    profilePicture: "",
   
  }

type UserContextType = {
    userData: FormData | string | any
    setFormValues: React.Dispatch<React.SetStateAction<FormData  | any >>
}

type UserContextProviderProps = {
    children: React.ReactNode
}

const UserContext = createContext({} as UserContextType)

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const [userData, setUserData] = useState(INITIAL_DATA)

    const setFormValues = (fields: Partial<FormData>) => {
        setUserData((prevValues) => ({
            ...prevValues,
            ...fields,
        }));
    };

    return (
        <UserContext.Provider value={{ userData, setFormValues }}>
            {children}
        </UserContext.Provider>
    )
}

export const useFormData = () => {
    const value = useContext(UserContext);
    if (value === null) {
        throw new Error("Vous devez entourer ce composant d\'un <UserContextProvider>")
    }
    return value;
}