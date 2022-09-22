import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useUserContext } from "../../hook/useUserContext";

function Users() {
  const { usersData } = useUserContext();
  const [usersInfo, setUsersInfo] = useState(null);
  useEffect(() => {
    setUsersInfo(usersData)
  }, [usersData]);
  return (
    <div className="w-full mx-auto">
      <div className="container  w-full mx-auto mt-12">
        <button
          id="add-button"
          onClick={() => {
            window.location.href = "/dashboard/users/add";
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          <span>Add New HR User</span>
        </button>
        <div className="flex flex-col w-full">
          <div id="role-title">All Users</div>
          {usersInfo && (
            <table className="table-fixed bg-white rounded-t-md mx-auto">
              <thead className="">
                <tr>
                  <th className="px-4">First Name</th>
                  <th className="px-4">Status</th>
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
                        <td>
                          {(item.Account === 1 && "Admin") ||
                            (item.Account === 2 && "Hr") ||
                            (item.Account === 3 && "Employee")}
                        </td>
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

export default Users;
