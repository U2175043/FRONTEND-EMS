import React, { useEffect, useState } from "react";
import { useCompanyContext } from "../../hook/useCompanyContext";
import { useUserContext } from "../../hook/useUserContext";

function AdminDashboard() {
  const { usersData } = useUserContext();
  const { compData } = useCompanyContext();

  const [employees, setEmployees] = useState(null)
  const [hr, setHr] = useState(null);

  useEffect(() => {
    if (usersData) {
      const employees = usersData.filter((item) => item.Account === 3);
      const hr = usersData.filter((item) => item.Account === 2);
      setEmployees(employees)
      setHr(hr)
    }
  }, [usersData]);

  return (
    <div className="container mx-auto mt-12">
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3 mx-4">
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Employees
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {usersData && employees && employees.length}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total HR's
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {usersData && hr && hr.length}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Companies
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {compData && compData.length}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Users
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {usersData && usersData.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
