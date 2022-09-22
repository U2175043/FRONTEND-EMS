import React, { useEffect, useState } from "react";
import { useUserContext } from "../../hook/useUserContext";
import { useHrContext } from "../../hook/useHrContext";
import { useRoleContext } from "../../hook/useRoleContext";
import { useLeaveContext } from "../../hook/useLeaveContext";

function HrDashboard() {
  const { usersData } = useUserContext();
  const { myHrData } = useHrContext();
  const { roleData } = useRoleContext()
  const { leaveData } = useLeaveContext()

  const [employees, setEmployees] = useState(null);

  useEffect(() => {
      
    if (usersData && myHrData) {
        const employees = usersData.filter((item) => item.company[0] === myHrData.company[0]);
        setEmployees(employees)
    }

  }, [usersData, myHrData])

  return (
    <div className="container mx-auto mt-12">
      <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3 mx-4">
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            My Employees
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {usersData && employees && employees.length}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Total Roles
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {roleData && roleData.length}
          </div>
        </div>
        <div className="w-full px-4 py-5 bg-white rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500 truncate">
            Leave Applications
          </div>
          <div className="mt-1 text-3xl font-semibold text-gray-900">
            {roleData && leaveData.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HrDashboard;
