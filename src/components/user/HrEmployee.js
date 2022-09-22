import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useHrContext } from "../../hook/useHrContext";
import { useUserContext } from "../../hook/useUserContext";

function HrEmployee() {
  const { usersData } = useUserContext();
  const { myHrData } = useHrContext()
  const [usersInfo, setUsersInfo] = useState(null);
  
  useEffect(() => {
    if (usersData && myHrData) {
      const myEmployees = usersData.filter(
      (item) => item.company[0] === myHrData.company[0]
    );
    setUsersInfo(myEmployees);
    }
  }, [usersData, myHrData]);
  return (
    <div className="w-full mx-auto">
      <div className="container  w-full mx-auto mt-12">
        <button
          id="add-button"
          onClick={() => {
            window.location.href = "/dashboard/employees/add";
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          <span>Add New Employee</span>
        </button>
        <div className="flex flex-col w-full">
          <div id="role-title">All My Employees</div>
          {usersInfo && (
            <table className="table-fixed bg-white rounded-t-md mx-auto">
              <thead className="">
                <tr>
                  <th className="px-4">First Name</th>
                  <th className="px-4">Email</th>
                  <th className="px-4">Department</th>
                  <th className="px-4">Update</th>
                  <th className="px-4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {usersInfo &&
                  usersInfo.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td> {item.FirstName} </td>
                        <td> {item.Email} </td>
                        <td>
                          {" "}
                          {item.department.length > 0 &&
                            item.department[0].DepartmentName}{" "}
                        </td>
                        <td>
                          <button className="hover:underline">edit</button>
                        </td>
                        <td>
                          <button className="hover:underline">delete</button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
        {/* {roleError && <div>{roleError}</div>} */}
      </div>
    </div>
  );
}

export default HrEmployee;
