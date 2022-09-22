import { Link } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";
import { useLogout } from "../../hook/useLogout";
import './navbar.css'

const Navbar = () => {
  const { logout } = useLogout();
  const { userData } = useAuthContext();

  const handleLogout = () => {
    logout()
  }
    return (
      <header className="App-header">
        <div className="container">
          <Link to="/">
            <h1 className="text-2xl font-semibold hover:line-through">Olumide - EMS</h1>
          </Link>
          <nav className="nav">
            <div>
              {/* <span>Hi!</span> */}
              {userData && <button onClick={handleLogout}>Log out</button>}
            </div>
            <div>
              {!userData && (
                <Link
                  to="/login"
                  className="text-2xl underline font-semibold hover:text-[#2b447b]"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    );
}
 
export default Navbar;