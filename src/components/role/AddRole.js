import { css } from "@emotion/react";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { usePost } from "../../hook/usePost";
import { useCompanyContext } from "../../hook/useCompanyContext";

function AddRole() {
  const { compData: companyList } = useCompanyContext();
  const { Post, isLoading, error } = usePost("http://localhost:4000/api/role/");

  const [compId, setCompId] = useState("");
  const [roleName, setRoleName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRole = { RoleName: roleName, CompanyID: compId };

    await Post(newRole);

    window.location.href = "/dashboard/role";
  };
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
  return (
    <div className="w-[450px] mx-auto">
      <form
        action=""
        method=""
        onSubmit={handleSubmit}
        className="bg-white rounded-t-md p-6 mt-12"
      >
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
            onChange={(e) => setCompId(e.target.value)}
            required
          >
            <option value="" defaultValue>
              Select Company
            </option>
            {companyList &&
              companyList.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.CompanyName}
                </option>
              ))}
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="role">New Role</label>
          <input
            className="login-form-input"
            type="text"
            placeholder="Role"
            required="required"
            name="role"
            onChange={(e) => setRoleName(e.target.value)}
          />
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
              window.location.href = "/dashboard/role";
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
        {error ? <p className="">{error}</p> : ""}
      </form>
    </div>
  );
}

export default AddRole;
