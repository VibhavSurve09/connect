import styles from "./UserForm.module.css";
import { useState, useContext } from "react";
import { UserContext } from "../../context/User";
import { uploadPhoto } from "../../services/firebase";
export default function UserForm() {
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("Male");
  const [profilePicture, setProfilePicture] = useState(null);
  const [age, setAge] = useState("");
  const [imageName, setImageName] = useState(null);
  const [error, setError] = useState("");
  const activeUser = useContext(UserContext);
  const handleForm = (e) => {
    e.preventDefault();
    const userFormData = {
      userName,
      bio,
      gender,
      age,
      profilePicture,
    };
    //Check username is unique
    activeUser.displayName = userName;

    uploadPhoto(activeUser?.displayName, profilePicture);
  };
  const onImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      setImageName(file.name);
    }
  };
  const isInValid = userName == "" || gender == "";
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
      <div className="w-full bg-gray-300 h-1 -mt-9 ">
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
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Profile
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form onSubmit={handleForm}>
                <div className="shadow sm:rounded-md sm:overflow-hidden">
                  <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="col-span-3 sm:col-span-2">
                        <label
                          htmlFor="company-website"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                          <input
                            type="text"
                            className="py-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                            placeholder="johndoe128"
                            value={userName}
                            onChange={(e) => {
                              setUserName(e.target.value);
                            }}
                          />{" "}
                          <span className="inline-flex items-center px-3 rounded-md border  border-gray-300 bg-gray-50 text-gray-500 text-sm">
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
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Tell us about yourself"
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
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                        className="mt-1 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
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
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
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
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
                      disabled={isInValid}
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>{" "}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
