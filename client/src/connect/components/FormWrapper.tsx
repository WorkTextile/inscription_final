import React, { ReactNode } from 'react'

type FormWrapperProps = {
    title: string
    children: ReactNode
}
const FormWrapper = ({ title, children }: FormWrapperProps) => {
  return (
    <>
      <h1>{title}</h1>
      <div>{children}</div>
    </>
  )
}

export default FormWrapper
