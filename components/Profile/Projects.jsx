import React, { useEffect, useState } from "react";
import Link from "next/link";
import { editProjectFB, getProjects } from "../../services/firebase";

function Projects({ docId, self }) {
  const [projects, setProjects] = useState({});
  const [editProject, setProjectEdit] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectDis, setProjectDis] = useState("");

  useEffect(() => {
    getProjects(docId).then((pro) => {
      setProjects(pro);
      setProjectName(pro.title);
      setProjectLink(pro.link);
      setProjectDis(pro.description);
    });
  }, [docId]);
  const editSaveProject = async () => {
    await editProjectFB(docId, { projectName, projectLink, projectDis });
  };
  return (
    <div className="flex flex-col-reverse w-full px-6 py-2 mt-4 border-2 shadow-md border-slate-400 bg-gray-50 rounded-2xl group">
      <div>
        {self ? (
          <div className="invisible group-hover:visible">
            {" "}
            <div className="flex items-center justify-end">
              <button
                onClick={(e) => setProjectEdit(!editProject)}
                className="px-3 py-1 mr-3 bg-indigo-600 rounded-md hover:bg-indigo-500"
              >
                <span className="font-normal text-white text-md"> Edit</span>
              </button>
              <button onClick={editSaveProject}>
                <span className="hover:text-black hover:text-xl hover:font-semibold">
                  Save
                </span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
      <div>
        {!editProject ? (
          <>
            <p className="font-sans text-3xl font-semibold text-black">
              {projects?.title}
            </p>
            <p className="py-1 font-serif">{projects.description}</p>
            <p>
              <span className="text-base italic font-medium text-black">
                Project Link:
              </span>
              <a
                href={`${projects.link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="font-mono text-xl text-blue-600 cursor-pointer">
                  {" "}
                  <u>{projects.link}</u>
                </i>
              </a>
            </p>
          </>
        ) : (
          <>
            <div className="flex flex-col pb-2">
              <label className="font-semibold">Title:</label>
              <input
                value={projectName}
                className="w-2/4 px-2 py-1 border-2 rounded-md border-slate-500"
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>

            <div className="flex flex-col py-2">
              <label className="font-semibold">Description:</label>
              <input
                value={projectDis}
                className="w-full px-2 py-1 border-2 rounded-md border-slate-500"
                onChange={(e) => setProjectDis(e.target.value)}
              />
            </div>

            <div className="flex flex-col py-2">
              <label className="font-semibold">Link:</label>
              <input
                value={projectLink}
                className="w-2/4 px-2 py-1 text-indigo-600 border-2 rounded-md border-slate-500"
                onChange={(e) => setProjectLink(e.target.value)}
              />
            </div>
          </>
        )}
      </div>
      <div>
        {self ? (
          <div className="invisible group-hover:visible">
            {" "}
            <div className="flex items-center justify-end">
              <div className="px-3 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Projects;
