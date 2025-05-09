import React, { useEffect, useState } from "react";
import { Search, Settings, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "@/config/config";
import { useAuth } from "@/contexts/AuthContext";
import { Customer } from "@/types/auth";

const customers = [
  {
    id: "#56578",
    name: "Brooklyn Simmons",
    avatar:
      "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=150",
    status: "Active",
    occupation: "Software Engineer",
    phone: "+1234567890",
    zone: "North",
  },
  {
    id: "#56579",
    name: "Dianne Russell",
    avatar:
      "https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&w=150",
    status: "Active",
    occupation: "Designer",
    phone: "+1234567891",
    zone: "South",
  },
];

const Customer_collector: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/customer/collector/${user.zoneId}`
        );
        const {
          success,
          data: customers,
        }: {
          success: boolean;
          data: Customer[];
        } = data;

        if (!success) {
          throw new Error("Unable to fetch customers");
        }

        setCustomers(customers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchCustomer();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button
          onClick={() => navigate("./create")}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-800 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {/* Search  */}
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <div className="mt-2 flex items-center space-x-4">
                <div className="relative flex-1 max-w-xs">
                  <input
                    type="text"
                    placeholder="Search"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-emerald-600 sm:text-sm sm:leading-6"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <button
                  title="create"
                  className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                >
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* customers */}
          <div className="mt-6 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Customer ID
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone Number
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Occupation
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Zone
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>

                  {isLoading ? (
                    <tbody className="divide-y divide-gray-200 animate-pulse">
                      {[...Array(5)].map((_, index) => (
                        <tr key={index}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="h-4 w-12 bg-gray-300 rounded"></div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-gray-300"></div>
                              <div className="ml-4">
                                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="h-4 w-20 bg-gray-300 rounded"></div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="h-4 w-28 bg-gray-300 rounded"></div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="h-4 w-16 bg-gray-300 rounded"></div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="h-4 w-16 bg-gray-300 rounded"></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : customers.length == 0 ? (
                    <p className=" text-emerald-800 font-semibold">
                      You don't have any customer from your assigned zone
                    </p>
                  ) : (
                    <tbody className="divide-y divide-gray-200">
                      {customers.map((customer) => (
                        <tr key={customer.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-md text-gray-500 sm:pl-0">
                            #{customer.id.slice(0,5).toUpperCase()}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="flex items-center">
                              <div className="">
                                <div className="font-medium text-gray-900">
                                  {customer.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {customer.phone}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {customer.occupation}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {customer.zone}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                customer.status.toLocaleLowerCase() === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {customer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer_collector;
