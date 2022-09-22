import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDepartmentContext } from "../../hook/useDepartmentContext";

function Department() {
  const { depData: allDepartments } = useDepartmentContext()
  const [depData, setDepData] = useState(null);

  useEffect(() => {
    setDepData(allDepartments)
  }, [allDepartments]);
  return (
    <div className="w-full mx-auto">
      <div className="container mx-auto mt-12">
        <button
          id="add-button"
          onClick={() => {
            window.location.href = "/dashboard/department/add";
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          <span>Add Department</span>
        </button>
        <div className="flex flex-col">
          <div id="role-title">All Departments</div>
          {depData && (
            <table className="table-fixed bg-white rounded-t-md mx-auto">
              <thead className="">
                <tr>
                  <th className="px-4">Company</th>
                  <th className="px-4">Department</th>
                  <th className="px-4">Update</th>
                  <th className="px-4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {depData &&
                  depData.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td> {item.company[0].CompanyName} </td>
                        <td> {item.DepartmentName} </td>
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
          {/* {rolePending && (
              <div id="loading-bar" className="m-auto">
                <RingLoader
                  css={override}
                  sizenit={"px"}
                  size={50}
                  color={"#0000ff"}
                  loading={rolePending}
                />
              </div>
            )} */}
        </div>
        {/* {roleError && <div>{roleError}</div>} */}
      </div>
    </div>
  );
}

export default Department;
