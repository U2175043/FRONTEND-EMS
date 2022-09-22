import { css } from "@emotion/react";
import React, { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { usePost } from "../../hook/usePost";

function AddCompany() {
  const { Post, isLoading, error } = usePost(
    "http://localhost:4000/api/company/"
  );

  const [companyData, setCompanyData] = useState({
    CompanyName: "",
    Email: "",
    Website: "",
    Address: "",
    PostalCode: "",
    ContactNo: "",
    ContactPerson: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(companyData)

    await Post(companyData);

    window.location.href = "/dashboard/company";
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
          <label htmlFor="name">Company Name</label>
          <input
            className="login-form-input"
            type="text"
            placeholder="Company Name"
            required="required"
            name="name"
            onChange={(e) =>
              setCompanyData({ ...companyData, CompanyName: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <label htmlFor="email">Email</label>
          <input
            className="login-form-input"
            type="email"
            placeholder="company@example.com"
            required="required"
            name="email"
            onChange={(e) =>
              setCompanyData({ ...companyData, Email: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <label htmlFor="website">Website</label>
          <input
            className="login-form-input"
            type="text"
            placeholder="www.companyurl.com"
            required="required"
            name="website"
            onChange={(e) =>
              setCompanyData({ ...companyData, Website: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <label htmlFor="address">Address</label>
          <input
            className="login-form-input"
            type="text"
            placeholder="Street Address"
            required="required"
            name="address"
            onChange={(e) =>
              setCompanyData({ ...companyData, Address: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <label htmlFor="postal">Postal Code</label>
          <input
            className="login-form-input"
            type="text"
            placeholder="Postal Code"
            required="required"
            name="postal"
            onChange={(e) =>
              setCompanyData({ ...companyData, PostalCode: e.target.value })
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
              setCompanyData({ ...companyData, ContactNo: e.target.value })
            }
          />
        </div>
        <div className="mt-2">
          <label htmlFor="person">Contact Person</label>
          <input
            className="login-form-input"
            type="text"
            placeholder="Contact Person"
            required="required"
            name="person"
            onChange={(e) =>
              setCompanyData({ ...companyData, ContactPerson: e.target.value })
            }
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
              window.location.href = "/dashboard/company";
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
        {error && <p className="bg-red">{error}</p>}
      </form>
    </div>
  );
}

export default AddCompany;
