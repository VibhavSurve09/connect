import React, { useState, useContext } from "react";
import { UserContext } from "../../context/User";
import { addProject } from "../../services/firebase";
export default function AddProjectForm() {
  const [projectTitle, setProjectTitle] = useState("");
  const [linkOfProject, setLinkOfProject] = useState("");
  const [description, setDescription] = useState("");
  const activeUser = useContext(UserContext);
  const submitProject = async (e) => {
    e.preventDefault();

    const data = {
      uid: activeUser?.uid,
      title: projectTitle,
      link: linkOfProject,
      description,
    };
    await addProject(data);
    setProjectTitle("");
    setLinkOfProject("");
    setDescription("");
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col w-full px-4 py-5 border-2 shadow-lg lg:w-4/5 lg:flex-row md:flex-row bg-gray-50 border-slate-500 sm:p-6">
        <div className="lg:w-1/3">
          <span className="block text-lg font-semibold text-gray-700">
            Tell Us About Your Project
          </span>
          <p className="mt-1 text-sm text-gray-600 ">
            Click On The <b>+</b> Icon To Save Your Details.
          </p>
        </div>
        <div className="w-full px-3 py-3 ml-3 bg-white rounded-md shadow-md">
          <div className="flex flex-col pt-4">
            <label className="block text-sm text-gray-700">Project Title</label>
            <input
              type="text"
              required
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="My Project"
              className="block w-full px-1 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="pt-4 mt-3">
            <label
              htmlFor="company-website"
              className="block text-sm text-gray-700"
            >
              Link - Please Provide The Complete Link (including https)
            </label>
            <div className="flex w-2/3 mt-1 rounded-md shadow-sm">
              <input
                type="url"
                required
                value={linkOfProject}
                onChange={(e) => setLinkOfProject(e.target.value)}
                className="flex-1 block w-full px-1 py-1 border-b-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm"
                placeholder="https://www.myproject.in"
              />
            </div>
          </div>
          <div className="pt-4 mt-3">
            <label className="block text-sm text-gray-700">
              Project Description
            </label>
            <div className="mt-1">
              <textarea
                required
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full px-1 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Tell us about your project- the idea, technology used, solo/group project, duration etc."
              />
            </div>
          </div>{" "}
          <div className="flex justify-end pt-10">
            <button onClick={submitProject}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
