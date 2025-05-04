import { UserRole } from "@/types/auth";

export const MOCK_USERS = [
  {
    id: "1",
    email: "admin@paragon.com",
    password: "admin123",
    name: "Shaun E. B.",
    role: "admin" as UserRole,
  },
  {
    id: "2",
    email: "collector@paragon.com",
    password: "collector123",
    name: "Maame Serwaah",
    role: "collector" as UserRole,
  },
  {
    id: "2",
    email: "risk@paragon.com",
    password: "risk123",
    name: "Eldad Opare",
    role: "risk" as UserRole,
  },
];
