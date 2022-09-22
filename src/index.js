import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { CompanyContextProvider } from './context/CompanyContext';
import { RoleContextProvider } from "./context/RoleContext";
import { PositionContextProvider } from "./context/PositionContext";
import { DepartmentContextProvider } from "./context/DepartmentContext";
import { UserContextProvider } from "./context/UserContext";
import { HrContextProvider } from "./context/HrContext";
import { LeaveContextProvider } from "./context/LeaveContext";
import { EmployeeContextProvider } from "./context/EmployeeContext";
import { WorkExperienceContextProvider } from "./context/WorkExperienceContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CompanyContextProvider>
        <RoleContextProvider>
          <PositionContextProvider>
            <DepartmentContextProvider>
              <UserContextProvider>
                <HrContextProvider>
                  <LeaveContextProvider>
                    <EmployeeContextProvider>
                      <WorkExperienceContextProvider>
                        <App />
                      </WorkExperienceContextProvider>
                    </EmployeeContextProvider>
                  </LeaveContextProvider>
                </HrContextProvider>
              </UserContextProvider>
            </DepartmentContextProvider>
          </PositionContextProvider>
        </RoleContextProvider>
      </CompanyContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
