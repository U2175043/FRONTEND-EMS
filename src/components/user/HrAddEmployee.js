import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useCompanyContext } from "../../hook/useCompanyContext";
import { useDepartmentContext } from "../../hook/useDepartmentContext";
import { useHrContext } from "../../hook/useHrContext";
import { usePositionContext } from "../../hook/usePositionContext";
import { usePost } from "../../hook/usePost";
import { useRoleContext } from "../../hook/useRoleContext";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function HrAddEmployee() {
  const { myHrData } = useHrContext();
  const { compData } = useCompanyContext();
  const { roleData: roles } = useRoleContext();
  const { posData } = usePositionContext();
  const { depData: departments } = useDepartmentContext();

  const { Post, isLoading, error } = usePost(
    "http://localhost:4000/api/employee/"
  );

  // form states
  const [userData, setUserData] = useState({
    FirstName: "",
    MiddleName: "",
    LastName: "",
    Email: "",
    Password: "",
    DOB: "",
    Account: 3,
    Gender: "",
    ContactNo: "",
    EmployeeCode: "",
    DepartmentID: "",
    PositionID: "",
    RoleID: "",
    CompanyID: "",
  });

  const [company, setCompany] = useState(null);
  const [roleData, setRoleData] = useState(null);
  const [depData, setDepData] = useState(null);

  useEffect(() => {
    if (myHrData && compData) {
      const item = compData.filter((item) => item._id === myHrData.company[0]);
      setCompany(item);
    }
    if (roles) {
      const roledesc = roles.filter(
        (item) => item.company[0]._id === myHrData.company[0]
      );
      setRoleData(roledesc);
    }
    if (departments) {
      const depdesc = departments.filter(
        (item) => item.company[0]._id === myHrData.company[0]
      );
      setDepData(depdesc);
    }
  }, [myHrData, compData, roles, departments]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Post(userData);

    setTimeout(() => {
      window.location.href = "/dashboard/employees";
    }, 1000);
  };

  return (
    <div className="w-[700px] mx-auto">
      <div>
        <button
          className="block p-2 bg-slate-500 w-full rounded"
          onClick={() => {
            window.location.href = "/dashboard/employees";
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
        <h1 className="text-center text-xl text-sky-900">Add New Employee</h1>
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
                setUserData({ ...userData, FirstName: e.target.value })
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
                setUserData({ ...userData, MiddleName: e.target.value })
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
                setUserData({ ...userData, LastName: e.target.value })
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
              setUserData({ ...userData, Email: e.target.value })
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
              setUserData({ ...userData, Password: e.target.value })
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
                setUserData({ ...userData, Gender: e.target.value })
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
                setUserData({ ...userData, DOB: e.target.value })
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
                setUserData({ ...userData, EmployeeCode: e.target.value })
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
                setUserData({ ...userData, ContactNo: e.target.value })
              }
            />
          </div>
        </div>

        <div className="mt-2">
          <label
            htmlFor="company"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Company
          </label>
          <select
            name="company"
            className="border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            onChange={(e) =>
              setUserData({ ...userData, CompanyID: e.target.value })
            }
          >
            <option value="" defaultValue>
              Select Position
            </option>
            {company && (
              <option value={company[0]._id} defaultValue>
                {company[0].CompanyName}
              </option>
            )}
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
              setUserData({ ...userData, PositionID: e.target.value })
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
              setUserData({ ...userData, RoleID: e.target.value })
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
              setUserData({ ...userData, DepartmentID: e.target.value })
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
              window.location.href = "/dashboard/employees";
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

export default HrAddEmployee;
