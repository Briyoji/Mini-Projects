import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUtil } from "../../utility/redux-store/utilSlice";
import { getUserDetails, updateUser, updateUserData } from "../../utility/redux-store/userSlice";
import { setError } from "../../utility/redux-store/authSlice";
import { useNavigate } from "react-router-dom";


function Profile(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);
  const { errCredentials, errPersonalData } = useSelector(state => state.auth);

  const [fields, setFields] = useState([])

  const toggleFields = (route) => {
      console.log(route);
      switch (route) {
        case "profile":
          setFields([
            {
              title: "Personal Data",
              fields: ["name", "username", "email", "birthdate", "profile type"],
            }
          ])
          break;

        case "update":
          setFields([
            {
              title: "Personal Data",
              fields: ["name", "username", "birthdate", "profile type"],
            },
            {
              title: "Credentials",
              fields: ["email", "password"],
            },
          ])
          break;

        case "update-pass":
          setFields([
            {
              title: "Personal Data",
              fields: ["name", "username", "birthdate", "profile type"],
            },
            {
              title: "Credentials",
              fields: ["email", "password", "confirm password"],
            },
          ])
          break;
        
        default:
          break;
      }
  }

  const [updateData, setUpdateData] = useState({
    password : "",
    confirmPassword : ""
  })
  
  const handleOnChange = (e) => {
    console.log(e.target.name.replace('data-input-', ''), e.target[e.target.name==='data-input-profile-type'?'checked':'value']);
    
    switch (e.target.name.replace('data-input-', '')) {
      case 'password':
        setUpdateData({ ...updateData, password: e.target.value })
        e.target.value.replace(/\s/g,'') !== '' ? toggleFields('update-pass') : toggleFields('update');
        break;
      case 'confirm password':
        setUpdateData({ ...updateData, confirmPassword: e.target.value })
        break;
      case 'profile-type':
        setTimeout( () => { dispatch( updateUserData({ ...userData, public: e.target.checked }) ); }, 100 );
        break;
      default:
        dispatch(updateUserData({ ...userData, [e.target.name.replace('data-input-', '')]: e.target.value }))
        break;
    }
}

  const buttonState = (res) => {
    const btn = document.querySelector('.toggle-button');
    btn.classList.remove('bg-1', 'bg-2');
    btn.classList.add(res.payload.data.public ? 'bg-1' : 'bg-2');
  }


  const handleUserRedirect = (route) => {
    dispatch(setUtil({ userRoute: route }));
    toggleFields(route);
    dispatch(getUserDetails()).then((res) => {
      buttonState(res);
    })
  }

  const handleUpdateUser = () => {
    console.log(userData,updateData);
   
    dispatch(setError({"errPersonalData": '‎'}))
    dispatch(setError({"errCredentials": '‎'}))

    const data = {...userData, ...updateData};

    const allValuesNotEmpty = Object.values(userData).every(value => value !== '');
    const passwordsMatch = updateData.password === '' ? true : updateData.password === updateData.confirmPassword && updateData.password !== '';

    console.log(allValuesNotEmpty, passwordsMatch);
    
    if (!allValuesNotEmpty) {
      dispatch(setError({"errPersonalData": "Please fill all required field!"}))
      dispatch(setError({"errCredentials": "Please fill all required field!"}))
      
      return;
    } else if (!passwordsMatch) {
      console.log("Passwords do not match!", updateData,updateData.password, updateData.confirmPassword);
      dispatch(setError({"errCredentials": "Passwords do not match!"}))
      return;
    }

    if (allValuesNotEmpty && passwordsMatch) {
      if (updateData.password !== '') {
        data.password = updateData.password;
      }
      dispatch(updateUser(data)).then((res) => {
        console.log("res", res);
      })
    }
  }


  useEffect(() => {

    toggleFields(props.entry);
    dispatch(setError({"errPersonalData": '‎'}))
    dispatch(setError({"errCredentials": '‎'}))

    dispatch(getUserDetails()).then((res) => {
      buttonState(res);
    })

    // eslint-disable-next-line
  }, [])

  return (
    <>
      <h1 className="form-title">{props.entry}</h1>

      {fields.map((fieldType, idx1) => {
        return !fieldType.fields.length ? (
          ""
        ) : (
          <div className="form-group flex-col" key={idx1}>
            <h3 className="form-group-title">{fieldType.title}</h3>
            <div className="form-group-content flex-col">
              {fieldType.fields.map((key) => {
                return key !== "profile type" ? (
                  <div key={key}>
                    <label
                      htmlFor={`data-input-${key}`}
                      className="content-label"
                    >
                      {key}
                    </label>
                    <div className="data-input-block">
                      <i className="fa-solid fa-user fa-lg"></i>
                      <input
                        type="text"
                        className="content-input"
                        id={`data-input-${key}`}
                        name={`data-input-${key}`}
                        onChange={handleOnChange}
                        value={userData[key]}
                        readOnly={props.entry === "profile" ? true : false}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    key={key}
                    className="data-input-block profile-type-toggle"
                  >
                    <label
                      htmlFor="data-input-profile-type"
                      className="content-label"
                    >
                      Profile Type
                    </label>
                    <input
                      type="checkbox"
                      className="toggle toggle-flip"
                      id="data-input-profile-type"
                      onChange={handleOnChange}
                      name="data-input-profile-type"
                      disabled={props.entry === "profile" ? "disabled" : ""}
                      />
                    <label
                      className="toggle-button"
                      data={userData.public ? "public" : "private"}
                      htmlFor="data-input-profile-type"
                    />
                  </div>
                );
              })}
            </div>
            <div className="form-group-error">
              {(fieldType.title === "Personal Data" ? errPersonalData !== "‎" : errCredentials !== "‎") && (
                <i className="fa-solid fa-triangle-exclamation"></i>
              )}
              <h3 className="auth-form-group-error">{fieldType.title === "Personal Data" ? errPersonalData : errCredentials}</h3>
            </div>
          </div>
        );
      })}

      { props.entry === 'update' && <h4
        className="form-submit-btn update-profile-btn"
        tabIndex="0"
        onClick={() => {
          handleUpdateUser()
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleUpdateUser()
          }
        }}
      >
        Update Profile
      </h4>}

      {props.entry === "profile" && (
        <span
          className="auth-user-redirect"
          onClick={() => {
            handleUserRedirect("update");
          }}
        >
          Update Profile
        </span>
      )}

      {props.entry === "update" && (
        <span
          className="auth-user-redirect"
          onClick={() => {
            handleUserRedirect("profile");
          }}
        >
          Profile
        </span>
      )}
    </>
  );
}

export default Profile;
