import { css } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { usePost } from "../../hook/usePost";
import { useCompanyContext } from "../../hook/useCompanyContext";
import { useHrContext } from "../../hook/useHrContext";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function HrAddDepartment() {
  const { compData: companyList } = useCompanyContext();
  const { myHrData } = useHrContext();
  // send request
  const { Post, isLoading, error } = usePost(
    "http://localhost:4000/api/department/"
  );

  const [roleName, setRoleName] = useState("");
  const [company, setCompany] = useState(null);

    useEffect(() => {
      if (companyList && myHrData) {
        // setCompId(myHrData.company[0])
        const company = companyList.filter(
          (item) => item._id === myHrData.company[0]
        );
        setCompany(company);
      }
    }, [companyList, myHrData]);


    // submit function
    const handleSubmit = async (e) => {
    e.preventDefault();
    const newPos = { DepartmentName: roleName, CompanyID: company[0]._id };

    await Post(newPos);

    window.location.href = "/dashboard/department";
  };

  return (
    <div className="w-[450px] mx-auto ">
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
            required
          >
            {company && (
              <option value={company[0]._id} defaultValue>
                {company[0].CompanyName}
              </option>
            )}
          </select>
        </div>
        <div className="mt-2">
          <label htmlFor="role">New Department</label>
          <input
            className="login-form-input"
            type="text"
            placeholder="Department"
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
              window.location.href = "/dashboard/department";
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

export default HrAddDepartment;
