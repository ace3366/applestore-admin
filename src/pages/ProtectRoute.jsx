import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const checkAuth = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API}/check-auth`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Can not get auth");
    }
    const resData = await response.json();
    console.log(resData);
    return resData.isAuth;
  } catch (err) {
    console.log(err);
  }
};

const ProtectedRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // Nếu đã đăng nhập thì sẽ vào route, còn không sẽ bị navigate tới /login
  useEffect(() => {
    const verifyAuth = async () => {
      const auth = await checkAuth();
      setIsAuthenticated(auth);
    };
    verifyAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="text-center h-screen">
        <div className="flex flex-col items-center text-center mx-auto">
          <h3 className="text-2xl mt-10 mb-8 font-medium">
            It may take some time to fetch data from the server<br></br> Please
            stand by or refresh the page
          </h3>
          <div className="animate-spin h-10 w-10 border-4 rounded-full border-t-blue-500"></div>
          <h3 className="text-xl text-red-500 font-semibold mt-7">
            We're sorry for this inconvenience
          </h3>
        </div>
      </div>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
