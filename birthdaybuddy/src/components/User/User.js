import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "../../utility/redux-store/authSlice";
import { getUserDetails } from "../../utility/redux-store/userSlice";
// import Profile from "./Profile";
// import SignUp from "../Auth/SignUp";
import Profile from "./Profile";

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userRoute } = useSelector((state) => state.utils);
  const { userData } = useSelector((state) => state.user);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticateUser()).then((res) => {

      // Ensure that the user is logged in
      if (!res.payload.status || res.payload.token === null) {
        navigate("/auth");
      }

      // Fetch user details
      dispatch(getUserDetails()).then((res) => {

        // Ensuring that User details are fetched
        if (res.payload.data === null) {
          navigate("/auth");
        }
        
        setTimeout(() => {setIsLoaded(true)}, 1000);
      });
    });

    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className={`form-container ${userRoute}-container`}>
        {isLoaded ? (
          userRoute === "profile" ? (
            <Profile entry='profile' data={userData} />
          ) : userRoute === "update" ? (
            <Profile entry='update' data={userData} />
          ) : (
            navigate("/404")
          )
        ) : (
          <h1>Loading</h1>
        )}
      </div>
    </>
  );
}

export default Auth;
