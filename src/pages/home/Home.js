import React from 'react'
import { Link } from 'react-router-dom';


function Home() {
    return (
      <div
        className="h-screen"
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: "52px",
        }}
      >
        <h1 className="m-auto pt-12 font-bold text-4xl">
          Welcome To Olumide's Mock Prototype of an Employee management and
          Company HR system
        </h1>
        <p className="mt-8 text-2xl">
          <Link className="hover:text-green-500 text-blue-500" to="/login">
            Click here
          </Link>{" "}
          to Login
        </p>
      </div>
    );
}

export default Home
