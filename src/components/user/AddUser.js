import { css } from "@emotion/react";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { usePost } from "../../hook/usePost";
import { useCompanyContext } from "../../hook/useCompanyContext";
import { useRoleContext } from "../../hook/useRoleContext";
import { usePositionContext } from "../../hook/usePositionContext";
import { useDepartmentContext } from "../../hook/useDepartmentContext";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function AddUser() {
  const { compData } = useCompanyContext();
  const { roleData } = useRoleContext();
  const { posData } = usePositionContext();
  const { depData } = useDepartmentContext();

  const { Post, isLoading, error } = usePost(
    "http://localhost:4000/api/employee/"
  );

  const [userData, setuserData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Email: "",
    Password: "",
    DOB: "",
    Account: 2,
    Gender: "",
    ContactNo: "",
    EmployeeCode: "",
    DepartmentID: "",
    PositionID: "",
    RoleID: "",
    CompanyID: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Post(userData);

    // window.location.href = "/dashboard/users";
  };

  return (
    <div className="w-[700px] mx-auto">
      <div>
        <button
          className="block p-2 bg-slate-500 w-full rounded"
          onClick={() => {
            window.location.href = "/dashboard/users";
          }}
        >
          Back
        </button>
      </div>
      <form
        action=""
        method=""
        onSubmit={handleSubmit}
        className="bg-white rounded-t-md p-6 mt-4"
      >
        <h1 className="text-center text-xl text-sky-900">Create New HR User</h1>
        <div className="flex justify-between gap-3">
          <div className="mt-2">
            <label htmlFor="firstname">First Name</label>
            <input
              className="login-form-input"
              type="text"
              placeholder="First Name"
              required="required"
              name="firstname"
              onChange={(e) =>
                setuserData({ ...userData, FirstName: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label htmlFor="middlename">Middle Name</label>
            <input
              className="login-form-input"
              type="text"
              placeholder="Middle Name"
              name="middlename"
              onChange={(e) =>
                setuserData({ ...userData, MiddleName: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label htmlFor="lastname">Last Name</label>
            <input
              className="login-form-input"
              type="text"
              placeholder="Last Name"
              required="required"
              name="lastname"
              onChange={(e) =>
                setuserData({ ...userData, LastName: e.target.value })
              }
            />
          </div>
        </div>
        <div className="mt-2">
          <label htmlFor="email">Email</label>
          <input
            className="login-form-input"
            type="email"
            placeholder="hr@example.com"
            required="required"
            name="email"
            onChange={(e) =>
              setuserData({ ...userData, Email: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <label htmlFor="password">Password</label>
          <input
            className="login-form-input"
            type="password"
            placeholder="Password"
            required="required"
            name="password"
            onChange={(e) =>
              setuserData({ ...userData, Password: e.target.value })
            }
          />
        </div>
        <div className="flex justify-between">
          <div className="mt-2">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              required="required"
              className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) =>
                setuserData({ ...userData, Gender: e.target.value })
              }
            >
              <option value="" defaultValue>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="nonbinary">Non Binary</option>
            </select>
          </div>

          <div className="mt-2">
            <label htmlFor="dob">Date of birth</label>
            <input
              className="login-form-input"
              type="date"
              required="required"
              name="dob"
              min="1960-01-01"
              max="2008-12-31"
              onChange={(e) =>
                setuserData({ ...userData, DOB: e.target.value })
              }
            />
          </div>
        </div>

        <div className="flex justify-between gap-14">
          <div className="mt-2">
            <label htmlFor="code">Employee Code</label>
            <input
              className="login-form-input"
              type="text"
              placeholder="Employee Code"
              required="required"
              name="code"
              onChange={(e) =>
                setuserData({ ...userData, EmployeeCode: e.target.value })
              }
            />
          </div>
          <div className="mt-2">
            <label htmlFor="contact">Contact Number</label>
            <input
              className="login-form-input"
              type="text"
              placeholder="Phone Number"
              required="required"
              name="contact"
              onChange={(e) =>
                setuserData({ ...userData, ContactNo: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-2">
          <label
            htmlFor="company"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Assign Company
          </label>
          <select
            name="company"
            className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setuserData({ ...userData, CompanyID: e.target.value })
            }
            required
          >
            <option value="" defaultValue>
              Select Company
            </option>
            {compData &&
              compData.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.CompanyName}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-2">
          <label
            htmlFor="position"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Assign position
          </label>
          <select
            name="position"
            className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setuserData({ ...userData, PositionID: e.target.value })
            }
            required
          >
            <option value="" defaultValue>
              Select Position
            </option>
            {posData &&
              posData.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.PositionName}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-2">
          <label
            htmlFor="role"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Assign Role
          </label>
          <select
            name="role"
            className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setuserData({ ...userData, RoleID: e.target.value })
            }
            required
          >
            <option value="" defaultValue>
              Select Role
            </option>
            {roleData &&
              roleData.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.RoleName}
                </option>
              ))}
          </select>
        </div>

        <div className="mt-2">
          <label
            htmlFor="department"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Assign Department
          </label>
          <select
            name="department"
            className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) =>
              setuserData({ ...userData, DepartmentID: e.target.value })
            }
            required
          >
            <option value="" defaultValue>
              Select Department
            </option>
            {depData &&
              depData.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.DepartmentName}
                </option>
              ))}
          </select>
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
              window.location.href = "/dashboard/users";
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
            Invalid Credentials
          </p>
        )}
      </form>
    </div>
  );
}

export default AddUser;
