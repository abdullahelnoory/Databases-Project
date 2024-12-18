import React from "react";
import "./ProfileSettings.css";
function ProfileSettings() {
  return (
    <div class="container-set">
      <div class="profile-card-set">
        <div class="profile-sidebar-set">
          <img
            class="profile-image-set"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="Profile-Image"
          />
          <h2 class="profile-name-set">Edogaru</h2>
          <p class="profile-email-set">edogaru@mail.com.my</p>
        </div>

        <div class="profile-settings-set">
          <h2 class="section-title-set">Profile Settings</h2>
          <form>
            <div class="form-group-set">
              <div class="form-input-set">
                <label for="first-name" class="set">
                  Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="first name"
                  class="set"
                />
              </div>
              <div class="form-input-set">
                <label for="surname" class="set">
                  Surname
                </label>
                <input
                  type="text"
                  id="surname"
                  placeholder="surname"
                  class="set"
                />
              </div>
            </div>
            <div class="form-group-set">
              <div class="form-input-set">
                <label for="mobile" class="set">
                  Mobile Number
                </label>
                <input
                  type="text"
                  id="mobile"
                  placeholder="enter phone number"
                  class="set"
                />
              </div>
              <div class="form-input-set">
                <label for="address1" class="set">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="address1"
                  placeholder="enter address line 1"
                  class="set"
                />
              </div>
            </div>
            <div class="form-group-set">
              <div class="form-input-set">
                <label for="address2" class="set">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="address2"
                  placeholder="enter address line 2"
                  class="set"
                />
              </div>
              <div class="form-input-set">
                <label for="postcode" class="set">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  placeholder="enter postcode"
                  class="set"
                />
              </div>
            </div>
            <div class="form-group-set">
              <div class="form-input-set">
                <label for="state" class="set">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  placeholder="enter state"
                  class="set"
                />
              </div>
              <div class="form-input-set">
                <label for="area" class="set">
                  Area
                </label>
                <input
                  type="text"
                  id="area"
                  placeholder="enter area"
                  class="set"
                />
              </div>
            </div>
            <div class="form-group-set">
              <div class="form-input-set">
                <label for="email" class="set">
                  Email ID
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="enter email id"
                  class="set"
                />
              </div>
              <div class="form-input-set">
                <label for="education" class="set">
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  placeholder="education"
                  class="set"
                />
              </div>
            </div>
            <div class="form-group-set">
              <div class="form-input-set">
                <label for="country" class="set">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  placeholder="country"
                  class="set"
                />
              </div>
              <div class="form-input-set">
                <label for="state-region" class="set">
                  State/Region
                </label>
                <input
                  type="text"
                  id="state-region"
                  placeholder="state"
                  class="set"
                />
              </div>
            </div>
            <div class="mt-5 text-center">
              <button class="btn btn-primary profile-button-set" type="button">
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
