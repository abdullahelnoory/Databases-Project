import React, { useState, useEffect } from "react";
import "./ProfileSettings.css";

function ProfileSettings() {
  let [profileState, setProfileState] = useState({
    email: "",
    fname: "",
    mname: "",
    lname: "",
    is_private: null,
  });

  let [prevProfileState, setPrevProfileState] = useState({
    email: "sdds@gmail.com",
    fname: "yousef",
    mname: "cr7",
    lname: "ciuuuu",
    is_private: false,
  });

  let [validState, setVaildState] = useState({
    success: "",
    error: "",
  });

  const userssn = sessionStorage.getItem("ssn");
  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(
          "http://localhost:6969/driver/get-profileSettingsData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ d_ssn: userssn }),
          }
        );
        const resultInjson = await result.json();
        console.log(resultInjson);
        setPrevProfileState(resultInjson.data);
        setProfileState({
          ...profileState,
          is_private: resultInjson.data.is_private,
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const sendData = async () => {
    try {
      const result = await fetch(
        "http://localhost:6969/driver/request-change-profileSettings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            d_ssn: userssn,
            date: profileState,
          }),
        }
      );
      const resultInjson = await result.json();
      if (resultInjson.success === false)
        setVaildState({
          error: "Error ",
          success: "",
        }); // error: resultInjson.suceess
      else {
        setVaildState({ error: "", success: "Sucess Edit Profile" }); //success: resultInjson.suceess
        setPrevProfileState(profileState);
        setProfileState({
          email: "",
          fname: "",
          mname: "",
          lname: "",
          is_private: null,
        });
      }

      console.log(resultInjson);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    sendData();
  }

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)} class="container-set">
        <div class="profile-card-set">
          <div class="profile-sidebar-set">
            <img
              class="profile-image-set"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Profile-Image"
            />
            <h2 class="profile-name-set">{prevProfileState.fname}</h2>
            <p class="profile-email-set">{prevProfileState.email}</p>
          </div>

          <div class="profile-settings-set">
            <h2 class="section-title-set">Profile Settings</h2>
            <form>
              <div class="form-group-set">
                <div class="form-input-set">
                  <label for="first-name" class="set">
                    fname
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    placeholder={prevProfileState.fname}
                    class="set"
                    value={profileState.fname}
                    onChange={(event) =>
                      setProfileState({
                        ...profileState,
                        fname: event.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-input-set">
                  <label for="mname" class="set">
                    mname
                  </label>
                  <input
                    type="text"
                    id="mname"
                    placeholder={prevProfileState.mname}
                    class="set"
                    value={profileState.mname}
                    onChange={(event) =>
                      setProfileState({
                        ...profileState,
                        mname: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div class="form-group-set">
                <div class="form-input-set">
                  <label for="lname" class="set">
                    lname
                  </label>
                  <input
                    type="text"
                    id="lname"
                    placeholder={prevProfileState.lname}
                    class="set"
                    value={profileState.lname}
                    onChange={(event) =>
                      setProfileState({
                        ...profileState,
                        lname: event.target.value,
                      })
                    }
                  />
                </div>
                <div class="form-input-set">
                  <label for="email" class="set">
                    Email
                  </label>
                  <input
                    type="text"
                    id="email"
                    placeholder={prevProfileState.email}
                    class="set"
                    value={profileState.email}
                    onChange={(event) =>
                      setProfileState({
                        ...profileState,
                        email: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div class="form-group-set  form-group-private-set">
                <label for="is_private" class="set">
                  Private Driver
                </label>
                <label id="is_private" class="container-chkbox">
                  <input
                    type="checkbox"
                    checked={
                      profileState.is_private === null
                        ? prevProfileState.is_private
                        : profileState.is_private
                    }
                    onChange={(event) => {
                      setProfileState({
                        ...profileState,
                        is_private: event.target.checked,
                      });
                      console.log(event.target.checked);
                    }}
                  />
                  <div class="checkmark-chkbox"></div>
                </label>
              </div>

              <div class="mt-5 text-center">
                <button
                  class="btn btn-primary profile-button-set"
                  type="button"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </form>
      {validState.error !== "" ? (
        <>
          <div className="popup-pass"> {validState.error}</div>
          <div
            className="formm-pass"
            onClick={() => {
              setVaildState({ ...validState, error: "" });
            }}
          ></div>
        </>
      ) : validState.success !== "" ? (
        <>
          <div className="popup-pass"> {validState.success}</div>
          <div
            className="formm-pass"
            onClick={() => {
              setVaildState({ ...validState, sucess: "" });
            }}
          ></div>
        </>
      ) : null}
    </div>
  );
}

export default ProfileSettings;
