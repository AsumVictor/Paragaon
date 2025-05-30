import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import LoanDetails from "./pages/LoanDetails";
import Notifications from "./pages/Notifications";
import Transaction from "./pages/Transaction";
import Loan from "./pages/Loan";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/Auth";
import Layout from "./components/Layout";
import Customer from "./pages/Customer";
import RequireRoleAccess from "./auth/RequireRoleAccess";
import CreateCustomer from "./screens/collector/CreateCustomerAccount";
import RequestLoans from "./pages/LoanRequests";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/customers" element={<Customer />} />
              <Route
                path="/customers/create"
                element={
                  <RequireRoleAccess allowedUsers={["Collector"]}>
                    <CreateCustomer />
                  </RequireRoleAccess>
                }
              />
              <Route path="/saving-account" element={<Notifications />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/loans" element={<Loan />} />

              <Route
                path="/loans/:id"
                element={
                  <RequireRoleAccess allowedUsers={["Credit_manager"]}>
                    <LoanDetails />
                  </RequireRoleAccess>
                }
              />

              <Route
                path="/loans-request"
                element={
                  <RequireRoleAccess allowedUsers={["Credit_manager"]}>
                    <RequestLoans />
                  </RequireRoleAccess>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />

            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
