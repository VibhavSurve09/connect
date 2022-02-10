import styles from "./UserForm.module.css";
import { useState, useContext } from "react";
import { UserContext } from "../../context/User";
import { doesUserNameExist, uploadPhoto } from "../../services/firebase";
import { serverTimestamp } from "firebase/firestore";
import { addUser } from "../../services/firebase";
import React from "react";
import { postUser } from "../../services/neo4j";
function UserForm({ pageIncrementer }) {
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("Male");
  const [profilePicture, setProfilePicture] = useState(null);
  const [age, setAge] = useState("");
  const [imageName, setImageName] = useState(null);
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisbaled] = useState(false);
  const activeUser = useContext(UserContext);
  const nodeData = {
    uid: activeUser.uid,
    emailAddress: activeUser.email,
    userName,
  };
  const handleForm = async (e) => {
    //Check username is unique
    e.preventDefault();

    const newUsername = await doesUserNameExist(userName);
    if (newUsername) {
      activeUser.displayName = userName;
      let imgUrl;
      if (profilePicture) {
        imgUrl = await uploadPhoto(activeUser?.displayName, profilePicture);
      }

      const userFormData = {
        userName,
        bio,
        gender,
        age,
        uid: activeUser.uid,
        emailAddress: activeUser.email,
        accountCreatedOn: serverTimestamp(),
        lastSeen: serverTimestamp(),
        following: [""],
        followers: [""],
        role: "user",
        status: "",
        photoURL: profilePicture ? imgUrl : activeUser.photoURL,
      };

      await addUser(userFormData);
      //*This is a function and not an API
      await postUser(nodeData);
      setUserName("");
      setBio("");
      setAge("");
      setGender("");
      setProfilePicture(null);
      setError("");
      setIsButtonDisbaled(true);
      pageIncrementer();
    } else {
      setError("Username already exists");
      setUserName("");
    }
  };
  const onImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setImageName(file.name);
    }
  };
  const options = [
    {
      label: "Male",

      value: "Male",
    },

    {
      label: "Female",

      value: "Female",
    },

    {
      label: "Other",

      value: "Other",
    },
  ];
  return (
    <div className="h-auto bg-gray-100">
      <br />
      <br />
      <div className={styles.container}>
        <ul className={styles.pbar}>
          <li className={styles.active}>step 1</li>
          <li>step 2</li>
          <li>step 3</li>
        </ul>
      </div>
      <br />
      <br />
      <div className="w-full h-1 bg-gray-300 -mt-9 ">
        <div className={`bg-indigo-300 h-1 ${styles.hrr}`}></div>
      </div>
      <br />
      <br />
      <br />
      <div className={`max-w-screen-xl ${styles.form1}`}>
        <div>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="px-2 text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="px-2 mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 space-y-6 bg-white sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Username
                      </label>
                      <div className="flex mt-1 rounded-md shadow-sm">
                        <input
                          type="text"
                          className="flex-1 block w-full px-1 py-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                          placeholder="johndoe128"
                          required
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                        />{" "}
                        <span className="inline-flex items-center px-3 text-sm text-gray-500 border border-gray-300 rounded-md bg-gray-50">
                          {error}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    <div className="mt-1">
                      <textarea
                        rows={3}
                        className="block w-full px-1 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Tell us about yourself"
                        required
                        value={bio}
                        onChange={(e) => {
                          setBio(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                      className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                      {options.map((option) => {
                        return (
                          <option key={option.label} value={option.value}>
                            {option.label}
                          </option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="first-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      min={16}
                      value={age}
                      required
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                      className="block w-full px-1 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cover photo{"  "}
                      {imageName ? (
                        <div className="text-indigo-500">
                          {imageName}
                          {` uploaded ✔️`}
                        </div>
                      ) : null}
                    </label>
                    <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={onImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 5MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                  <button
                    onClick={handleForm}
                    disabled={isButtonDisabled}
                    className={`inline-flex justify-center px-4 py-2 text-sm font-medium text-white ${
                      isButtonDisabled && `bg-indigo-300`
                    } bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(UserForm);
