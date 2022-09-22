import React from "react";
import { useEmployeeContext } from "../../hook/useEmployeeContext";

function EmpDashboard() {
  const { employeeData } = useEmployeeContext();
  if (employeeData)
    return (
      <div className="mx-auto">
        <h2 className="text-2xl font-semibold my-6">
          Employee Code: {employeeData.EmployeeCode}{" "}
        </h2>
        <button
          id="add-button"
          onClick={() => {
            window.location.href = "/dashboard/employee/profile/update";
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <span>Add/Update Profile Information</span>
        </button>
        <div className="flex flex-col w-full">
          <div id="role-title">Profile Information</div>
          {/* {usersInfo && ( */}
          <table className="table-fixed bg-white rounded-t-md mx-auto">
            <thead className="">
              <tr>
                <th className="px-4">First Name</th>
                <th className="px-4">Middle Name</th>
                <th className="px-4">Last Name</th>
                <th className="px-4">Email</th>
                <th className="px-4">Contact Number</th>
                <th className="px-4">Present Address</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{employeeData.FirstName}</td>
                <td>{employeeData.MiddleName}</td>
                <td>{employeeData.LastName}</td>
                <td>{employeeData.Email}</td>
                <td>{employeeData.ContactNo}</td>
                <td>{employeeData.PresentAddress}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

    return (<div className="m-auto font-light text-2xl">Loading...</div>)
}

export default EmpDashboard;
