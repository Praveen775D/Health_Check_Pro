import React from "react";
import { GoogleLogin } from "react-google-login";

const GoogleAuth = () => {
  const handleSuccess = (response) => {
    console.log("Google Login Success:", response);
    window.location.href = "http://localhost:4000/auth/google";
  };

  const handleFailure = (response) => {
    console.log("Google Login Failed:", response);
  };

  return (
    <div className="text-center mt-4">
      <GoogleLogin
        clientId="383528839419-92vh4n7gln2tos59qj79eejo4c638j3p.apps.googleusercontent.com"
        buttonText="Continue with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default GoogleAuth;
