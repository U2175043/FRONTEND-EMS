import React, { useState } from "react";
import { useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./role.css";
import { useRoleContext } from "../../hook/useRoleContext";
import { useHrContext } from "../../hook/useHrContext";

function HrRole() {
  const { roleData } = useRoleContext();
  const { myHrData } = useHrContext();
  const [roleList, setRoleList] = useState(null);

  useEffect(() => {
    if (roleData && myHrData) {
      const roles = roleData.filter(
        (item) => item.company[0]._id === myHrData.company[0]
      );
      setRoleList(roles);
    }
  }, [roleData, myHrData]);

  return (
    <div className="w-full mx-auto">
      <div className="container mx-auto mt-12">
        <button
          id="add-button"
          onClick={() => {
            window.location.href = "/dashboard/role/add";
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          <span>Add Role</span>
        </button>
        <div className="flex flex-col">
          <div id="role-title">Roles</div>
          {roleList && (
            <table className="table-fixed bg-white rounded-t-md mx-auto">
              <thead className="">
                <tr>
                  <th className="px-4">Company</th>
                  <th className="px-4">Role</th>
                  <th className="px-4">Update</th>
                  <th className="px-4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {roleList &&
                  roleList.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td> {item.company[0].CompanyName} </td>
                        <td> {item.RoleName} </td>
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
      </div>
    </div>
  );
}

export default HrRole;
