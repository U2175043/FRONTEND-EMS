import React from "react";
import { useLeaveContext } from "../../../hook/useLeaveContext";

function HrLeave() {
  const { leaveData } = useLeaveContext();
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(leaveData);

  const handleStatus = async (e, item) => {
    e.preventDefault();
    if (userData) {
      try {
        const response = await fetch(
          "http://localhost:4000/api/leave/hr/" + item,
          {
            method: "PUT",
            headers: { Authorization: userData ? userData.token : "" },
            body: JSON.stringify({ Status: true }),
          }
        );
        const json = await response.json();
        console.log(json)
      } catch (err) {console.log("From Hook", err);}
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="container  w-full mx-auto mt-12">
        <div className="flex flex-col w-full">
          <div id="role-title">All Leave Applications</div>
          {leaveData && (
            <table className="table-fixed bg-white rounded-t-md mx-auto">
              <thead className="">
                <tr>
                  <th className="px-4">Employee Name</th>
                  <th className="px-4">Employee Email</th>
                  <th className="px-4">Reason for leave</th>
                  <th className="px-4">From Date</th>
                  <th className="px-4">To Date</th>
                  <th className="px-4">Status</th>
                  <th className="px-4">Update</th>
                  <th className="px-4">Delete</th>
                </tr>
              </thead>
              <tbody>
                {leaveData &&
                  leaveData.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td> {item.employee[0].FirstName} </td>

                        <td> {item.employee[0].Email} </td>
                        <td> {item.Reasonforleave} </td>
                        <td> {item.FromDate} </td>
                        <td> {item.ToDate} </td>
                        <td> {item.Status ? "Approved" : "Pending"} </td>
                        <td>
                          <button
                            onClick={(e) => handleStatus(e, item._id)}
                            className="hover:underline px-2"
                          >
                            Approve
                          </button>
                          <button className="hover:underline px-2">
                            Reject
                          </button>
                        </td>
                        <td>
                          <button className="hover:underline">Delete</button>
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

export default HrLeave;
