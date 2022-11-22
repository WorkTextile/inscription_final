import React from "react"
import FormWrapper from "../../../components/FormWrapper";
import { useFormData } from "../../../../context/UserContext";
import { useForm } from 'react-hook-form'
//import { makeRequest } from "../../../../axios"
import { yupResolver } from "@hookform/resolvers/yup";
import { UploadImage } from "../../../components/UploadImage";
import GoogleAutoComplete from "../../../components/GoogleAutoComplete";
import * as yup from "yup";

const schema = yup.object().shape({
  picture: yup.mixed()
    .test('required', "You need to provide a file", (value) =>{
      return value && value.length
    } )
    .test("fileSize", "The file is too large", (value, context) => {
      return value && value[0] && value[0].size <= 2000000;
    })
    .test("type", "We only support jpeg, jpg, png, gif", function (value) {
      return value && (
        value[0] && value[0].type === "image/jpeg"||
        value[0] && value[0].type === "image/jpg"||
        value[0] && value[0].type === "image/png"||
        value[0] && value[0].type === "image/gif"
      );
    }),
});

type UserData = {
  clientBrand: string;
  clientJob: string;
};

type File = {
  picture: string;
}

type UserFormProps = UserData & {
  setFormValues: (fields: Partial<UserData>) => void
}

const ClientBrandInfo = ({ clientBrand, clientJob, setFormValues }: UserFormProps) => {
  
  const { userData } = useFormData()

  const onSubmit = async (data: any) => {

    try {

      //const formData = new FormData()
      //formData.append("picture", data.picture[0])
      //const res = await makeRequest.post("/upload", formData)
      //return res.data;
    console.log(data)

    } catch (error) {
        console.log(error);
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<File>({
    resolver: yupResolver(schema), 
    defaultValues: userData 
  });

  return (

    <FormWrapper title= {`Informations sur votre: ${userData.clientStructure}`}>
            
      <h4>Visibles sur votre page personnelle</h4>
      <UploadImage />
      {/*
      <input
        autoFocus
        type="file"
        {...register('picture')}
        
      />
    */}
    {/* {errors.picture && <p className="alert" role="alert">{errors.picture.message}</p>}*/}
     
     {/*<button onClick={handleSubmit(onSubmit)}>Submit</button>*/}
     <br />
     <br />

     <input 
        autoFocus
        required
        type="text"
        placeholder="Votre Marque"
        value={clientBrand}
        onChange={e => setFormValues({ clientBrand: e.target.value })}

      />
            
      <input
        autoFocus
        required 
        type="text"
        placeholder="Post (Exemple: Gérant)"
        value={clientJob}
        onChange={e => setFormValues({ clientJob: e.target.value })}
                    
      />

      <GoogleAutoComplete />
      <br />
  
    </FormWrapper>
  )
}

export default ClientBrandInfo
