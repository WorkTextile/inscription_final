import React from "react";
import FormWrapper from "../../../components/FormWrapper";
import { useFormData } from "../../../../context/UserContext";
import { useForm } from 'react-hook-form'
import GoogleAutoComplete from "../../../components/GoogleAutoComplete";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UploadImage } from "../../../components/UploadImage";

const schema = yup.object().shape({
  usinePicture: yup.mixed()
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
    usineName: string;
    usineJob: string;
    files: string | any;
    setFiles: string | any;
};

type File = {
  usinePicture: string;
}

type UserFormProps = UserData & {
    setFormValues: (fields: Partial<UserData>) => void
}


const UsineInfo = ({ setFiles,usineName, usineJob, setFormValues }: UserFormProps) => {
  
  const { userData } = useFormData()
  
  const onChangePicture = (e: any) => {
    setFiles(URL.createObjectURL(e.target.files[0]));
  };
  
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

    <FormWrapper title= {`Informations sur votre: ${userData.usineStructure}`}>
            
      <h4>Visibles sur votre page personnelle</h4>
      <UploadImage />
      {/*
      <input
        autoFocus
        type="file"
        {...register('usinePicture')}
        
      />

    {errors.usinePicture && <p className="alert" role="alert">{errors.usinePicture.message}</p>}
    */}
    
     <br />
     <br />

    <input

      autoFocus
      required
      type="text"
      placeholder="Nom de votre usine"
      value={usineName}
      onChange={e => setFormValues({ usineName: e.target.value })}

    />
            
    <input

      autoFocus
      required 
      type="text"
      placeholder="Post (Exemple: Gérant)"
      value={usineJob}
      onChange={e => setFormValues({ usineJob: e.target.value })}
                    
    />
                
    <GoogleAutoComplete />
    <br />
    
    </FormWrapper>
  )
}

export default UsineInfo
