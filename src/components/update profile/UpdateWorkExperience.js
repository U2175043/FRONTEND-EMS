import { css } from "@emotion/react";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useAuthContext } from "../../hook/useAuthContext";
import { useEmployeeContext } from "../../hook/useEmployeeContext";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

// make the form a component and pass the profile details
function UpdateEmpProfile() {
  const { employeeData } = useEmployeeContext();
  const { userData } = useAuthContext();

  // form states
  const [empData, setEmpData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = empData;

    if (userData && employeeData) {
      const Post = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            "http://localhost:4000/api/employee/personal-info/" +
              employeeData._id,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: userData ? userData.token : "",
              },
              body: JSON.stringify(data),
            }
          );
          const json = await response.json();

          if (!response.ok) {
            setIsLoading(false);
            setError(json);
          }
          if (response.ok) {
            // update loading state
            console.log("successful");
            setIsLoading(false);
          }
        } catch (err) {
          setIsLoading(false);
          setError(err);
          console.log("From Hook", err);
        }
      };
      Post(empData);
    }

    // setTimeout(() => {
    //   window.location.href = "/dashboard";
    // }, 1000);
  };

  if (employeeData)
    return (
      <div className="mt-8 mx-auto">
        <div className="w-[700px]">
          <div>
            <button
              className="block p-2 bg-slate-500 w-full rounded"
              onClick={() => {
                window.location.href = "/dashboard";
              }}
            >
              Go Back
            </button>
          </div>
          <form
            action=""
            method=""
            onSubmit={handleSubmit}
            className="bg-white rounded-t-md p-6 mt-4"
          >
            <h1 className="text-center text-xl text-sky-900">
              Update Employee Profile
            </h1>
            <div className="">
              <div className="mt-2">
                <label htmlFor="firstname">First Name</label>
                <input
                  className="login-form-input"
                  type="text"
                  placeholder={employeeData.FirstName}
                  name="firstname"
                  onChange={(e) =>
                    setEmpData({ ...empData, FirstName: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <label htmlFor="middlename">Middle Name</label>
                <input
                  className="login-form-input"
                  type="text"
                  placeholder={employeeData.MiddleName || "Add Middle Name"}
                  name="middlename"
                  onChange={(e) =>
                    setEmpData({ ...empData, MiddleName: e.target.value })
                  }
                />
              </div>
              <div className="mt-2">
                <label htmlFor="lastname">Last Name</label>
                <input
                  className="login-form-input"
                  type="text"
                  placeholder={employeeData.LastName}
                  name="lastname"
                  onChange={(e) =>
                    setEmpData({ ...empData, LastName: e.target.value })
                  }
                />
              </div>
              <div className="mt-2 block">
                <label htmlFor="contact">Contact Number</label>
                <input
                  className="login-form-input"
                  type="text"
                  placeholder={employeeData.ContactNo || "Add Contact Number"}
                  name="contact"
                  onChange={(e) =>
                    setEmpData({ ...empData, ContactNo: e.target.value })
                  }
                />
              </div>
              <div className="mt-2 block">
                <label htmlFor="address">Present Address</label>
                <input
                  className="login-form-input"
                  type="text"
                  placeholder={
                    employeeData.PresentAddress || "Add Current Address"
                  }
                  name="address"
                  onChange={(e) =>
                    setEmpData({ ...empData, PresentAddress: e.target.value })
                  }
                />
              </div>
            </div>
            <div>
              <input
                className="login-form-input"
                type="submit"
                value="Submit"
                id="submitBtn"
              />
              <button
                className="block p-2 bg-slate-500 w-full rounded"
                onClick={() => {
                  window.location.href = "/dashboard";
                }}
              >
                Cancel
              </button>
            </div>

            <div className="loading">
              <ScaleLoader
                css={override}
                sizeunit={"px"}
                size={150}
                color={"#123abc"}
                loading={isLoading}
              />
            </div>
            {error && (
              <p style={{ color: "red", textAlign: "center" }}>
                Failed to update profile
              </p>
            )}
          </form>
        </div>
      </div>
    );
  return <div className="m-auto font-light text-2xl">Loading...</div>;
}

export default UpdateEmpProfile;
