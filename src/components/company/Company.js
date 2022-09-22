import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useCompanyContext } from "../../hook/useCompanyContext";

function Company() {
const { compData: depData } = useCompanyContext();
  return (
    <div className="w-full mx-auto">
      <div className="container mx-auto mt-12">
        <button
          id="add-button"
          onClick={() => {
            window.location.href = "/dashboard/company/add";
          }}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          <span>Create Company</span>
        </button>
        <div className="flex flex-col">
          <div id="role-title">All Companies</div>
          {depData && (
            <table className="table-fixed bg-white rounded-t-md mx-auto">
              <thead className="">
                <tr>
                  <th className="px-4">Name</th>
                  <th className="px-4">Website</th>
                  <th className="px-4">Email</th>
                  <th className="px-4">Contact Person</th>
                  <th className="px-4">Update</th>
                  <th className="px-4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {depData &&
                  depData.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td> {item.CompanyName} </td>
                        <td> {item.Website} </td>
                        <td> {item.Email} </td>
                        <td> {item.ContactPerson} </td>
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

export default Company;
