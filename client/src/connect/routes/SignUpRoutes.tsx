import React from "react"
import SignUp from "../auth/SignUp";
import { useRoutes } from 'react-router-dom';
import CompletedInfo from "../components/CompletedInfo";
import AccountTypeInfo from "../account-type/AccountTypeInfo";
import ClientPage from "../account-type/client/ClientPage";
import ParticularPage from "../account-type/particular/ParticularPage";
import FreelancePage from "../account-type/freelance/FreelancePage";
import UsineConfection from "../account-type/usine/UsineConfection";
import UsineMatiere from "../account-type/usine/UsineMatiere";
import UsineFilature from "../account-type/usine/UsineFilature";
import UsineDecoupe from "../account-type/usine/UsineDecoupe";
import UsineAccessoires from "../account-type/usine/UsineAccessoires";
import UsineAtelierSerigraphieEtBroderie from "../account-type/usine/UsineAtelierSerigraphieEtBroderie";
import "../../styles/globals.css"

const SignUpRoutes: React.FC = (): JSX.Element => {
  
  const mainRoutes = {
    path: '/',
    element: <SignUp />
  };

  const accountType = {
    path: '/account',
    element: <AccountTypeInfo />
  };

  const clientPage = {
    path: '/client-page',
    element: <ClientPage/>
  };

  const particularPage = {
    path: '/particular-page',
    element: <ParticularPage />
  };

  const freelancePage = {
    path: '/freelance-page',
    element: <FreelancePage />
  };

  const usineConfection = {
    path: '/usine-confection',
    element: <UsineConfection />
  };

  const usineMatiere = {
    path: '/usine-matiere',
    element: <UsineMatiere />
  };

  const usineFilature = {
    path: '/usine-filature',
    element: <UsineFilature />
  };

  const usineDecoupe = {
    path: '/usine-decoupe',
    element: <UsineDecoupe />
  };

  const usineAccessoires = {
    path: '/usine-accessoires',
    element: <UsineAccessoires/>
  };

  const usineAtelierSerigraphieEtBroderie = {
    path: '/usine-atelier-serigraphie-broderie',
    element: <UsineAtelierSerigraphieEtBroderie />
  };
    
  const completedRoutes = {
    path: '/completed',
    element: <CompletedInfo />
  };

  const routing = useRoutes(

    [ 
      mainRoutes, 
      accountType,
      clientPage, 
      particularPage, 
      freelancePage,
      usineConfection,
      usineMatiere,
      usineFilature,
      usineDecoupe, 
      usineAccessoires,
      usineAtelierSerigraphieEtBroderie,
      completedRoutes
    ]
  );

  return <>{routing}</>;
}

export default SignUpRoutes;
