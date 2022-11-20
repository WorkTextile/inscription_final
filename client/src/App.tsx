import React from "react"
import SignUpRoutes from "./connect/routes/SignUpRoutes";
import { UserContextProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <div className="formCard">
      <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <SignUpRoutes />
      </UserContextProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App;


