import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import { useAuthContext } from "./hook/useAuthContext";
import HrDashboard from "./pages/dashboard/HrDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import EmpDashboard from "./pages/dashboard/EmpDashboard";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Navbar from "./components/navbar/Navbar";
import AdminSideBar from "./components/sideBar/AdminSideBar";
import Role from "./components/role/Role";
import AddRole from "./components/role/AddRole";
import Position from "./components/position/Position";
import AddPosition from "./components/position/AddPosition";
import Department from "./components/department/Department";
import AddDepartment from "./components/department/AddDepartment";
import Company from "./components/company/Company";
import AddCompany from "./components/company/AddCompany";
import Users from "./components/user/Users";
import AddUser from "./components/user/AddUser";
import HrSideBar from "./components/sideBar/HrSideBar";
import HrAddRole from "./components/role/HrAddRole";
import HrRole from "./components/role/HrRole";
import HrDepartment from "./components/department/HrDepartment";
import HrAddDepartment from "./components/department/HrAddDepartment";
import HrEmployee from "./components/user/HrEmployee";
import HrAddEmployee from "./components/user/HrAddEmployee";
import EmployeeSidebar from "./components/sideBar/EmployeeSidebar";
import HrLeave from "./components/company/leave/HrLeave";
import UpdateEmpProfile from "./components/update profile/UpdateEmpProfile";

function App() {
  const { userData } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
              </>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route
            path="/login"
            element={
              userData ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <>
                  <Navbar />
                  <Login />
                </>
              )
            }
          />

          {/* Admin routes */}
          {userData && userData.emp.Account === 1 && (
            <>
              <Route
                path="/dashboard"
                element={
                  <AdminSideBar userData={userData}>
                    <AdminDashboard />
                  </AdminSideBar>
                }
              />
              <Route
                index
                element={
                  <AdminSideBar>
                    <AdminDashboard />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/role"
                element={
                  <AdminSideBar userData={userData}>
                    <Role />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/role/add"
                element={
                  <AdminSideBar userData={userData}>
                    <AddRole />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/position/"
                element={
                  <AdminSideBar userData={userData}>
                    <Position />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/position/add"
                element={
                  <AdminSideBar userData={userData}>
                    <AddPosition />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/department/"
                element={
                  <AdminSideBar userData={userData}>
                    <Department />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/department/add"
                element={
                  <AdminSideBar userData={userData}>
                    <AddDepartment />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/company/"
                element={
                  <AdminSideBar userData={userData}>
                    <Company />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/company/add"
                element={
                  <AdminSideBar userData={userData}>
                    <AddCompany />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/users/"
                element={
                  <AdminSideBar userData={userData}>
                    <Users />
                  </AdminSideBar>
                }
              />
              <Route
                path="/dashboard/users/add"
                element={
                  <AdminSideBar userData={userData}>
                    <AddUser />
                  </AdminSideBar>
                }
              />
            </>
          )}

          {/* Hr routes */}
          {userData && userData.emp.Account === 2 && (
            <>
              <Route
                path="/dashboard"
                element={
                  <HrSideBar userData={userData}>
                    <HrDashboard />
                  </HrSideBar>
                }
              />
              <Route
                path="/dashboard/role"
                element={
                  <HrSideBar userData={userData}>
                    <HrRole />
                  </HrSideBar>
                }
              />
              <Route
                path="/dashboard/role/add"
                element={
                  <HrSideBar userData={userData}>
                    <HrAddRole />
                  </HrSideBar>
                }
              />
              <Route
                path="/dashboard/department/"
                element={
                  <HrSideBar userData={userData}>
                    <HrDepartment />
                  </HrSideBar>
                }
              />
              <Route
                path="/dashboard/department/add"
                element={
                  <HrSideBar userData={userData}>
                    <HrAddDepartment />
                  </HrSideBar>
                }
              />
              <Route
                path="/dashboard/employees"
                element={
                  <HrSideBar userData={userData}>
                    <HrEmployee />
                  </HrSideBar>
                }
              />
              <Route
                path="/dashboard/employees/add"
                element={
                  <HrSideBar userData={userData}>
                    <HrAddEmployee />
                  </HrSideBar>
                }
              />
              <Route
                path="/dashboard/leave-applications"
                element={
                  <HrSideBar userData={userData}>
                    <HrLeave />
                  </HrSideBar>
                }
              />
            </>
          )}

          {/* Employee routes */}
          {userData && userData.emp.Account === 3 && (
            <>
              <Route
                path="/dashboard"
                element={
                  <EmployeeSidebar userData={userData}>
                    <EmpDashboard />
                  </EmployeeSidebar>
                }
              />
              <Route
                path="/dashboard/employee/profile/update"
                element={
                  <EmployeeSidebar userData={userData}>
                    <UpdateEmpProfile />
                  </EmployeeSidebar>
                }
              />
              <Route
                path="/dashboard/employee/work-history"
                element={
                  <EmployeeSidebar userData={userData}>
                    <UpdateEmpProfile />
                  </EmployeeSidebar>
                }
              />
              <Route
                path="/dashboard/employee/work-history/update"
                element={
                  <EmployeeSidebar userData={userData}>
                    <UpdateEmpProfile />
                  </EmployeeSidebar>
                }
              />
            </>
          )}
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
