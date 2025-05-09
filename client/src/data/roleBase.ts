import {
  LayoutDashboard,
  Users,
  PiggyBank,
  Banknote,
  FileText,
  CheckCircle2,
  PlusCircle,
  Folder,
} from "lucide-react";

const roleBasedRoutes = {
  admin: [
    { label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { label: "Customers", icon: Users, href: "/customers" },
    { label: "Savings Accounts", icon: PiggyBank, href: "/savings-accounts" },
    { label: "Transactions", icon: Banknote, href: "/transactions" },
    { label: "Loans", icon: FileText, href: "/loans" },
    { label: "Repayments", icon: Banknote, href: "/repayments" },
    { label: "Zones", icon: Folder, href: "/zones" },
    { label: "Users", icon: Users, href: "/users" },
  ],

  collector: [
    { label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { label: "Customers", icon: Users, href: "/customers" },
    { label: "Transactions", icon: Banknote, href: "/transactions" },
    { label: "Loans", icon: FileText, href: "/loans" },
    { label: "Repay Loan", icon: FileText, href: "/repay-loan" },
  ],

  credit_manager: [
    { label: "Dashboard", icon: LayoutDashboard, href: "/" },
    { label: "Loans", icon: FileText, href: "/loans" }, // view loans by zone/status
    { label: "Request New Loan", icon: PlusCircle, href: "/loans-request" }, // create new loan request
    { label: "Approve Loans", icon: CheckCircle2, href: "/loans/approvals" }, // approve loans
  ],
};

export default roleBasedRoutes;
