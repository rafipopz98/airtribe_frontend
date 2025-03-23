import React from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { ROUTERS } from "../../helpers/routes";
import { storeLocal, USER_DATA } from "../../helpers/utils";
import useApi from "../../api-call/use-api";
import { toast } from "sonner";

const UserForm = () => {
  const { callApi, loading, error } = useApi("user/add-user", "POST");

  const naviagte = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log("Form Data Submitted:", data);
    const formattedData = {
      name: data.name,
      email: data.email,
      phoneNumber: data.phone,
    };

    const response = await callApi(formattedData);
    if (response) {
      toast.success("Success", {
        description: "Logged In Successfully",
      });
      console.log(response, "respo");
      storeLocal(data, USER_DATA);
      naviagte(ROUTERS.USER.CHAT);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white px-4">
      <Navbar />
      {/* Add padding to prevent overlap */}
      <div className="flex flex-col items-center justify-center flex-grow pt-20">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl min-h-[500px] rounded-lg border border-gray-50 bg-white p-10 shadow-lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm h-[10vh]">
            <img
              alt="Your Company"
              src="/logo.png"
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-6 text-center text-3xl tracking-tight text-gray-900">
              Start Application
            </h2>
          </div>
          <div className="mt-6 flex flex-col gap-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    required
                    autoComplete="phone"
                    className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between cursor-pointer">
                <button
                  type="submit"
                  className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Apply Now
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
