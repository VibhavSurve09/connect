import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { editProjectFB, getProjects } from '../../services/firebase';

function Projects({ docId }) {
  const [projects, setProjects] = useState({});
  const [editProject, setProjectEdit] = useState(false);
  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [projectDis, setProjectDis] = useState('');

  useEffect(() => {
    getProjects(docId).then((pro) => {
      setProjects(pro);
    });
  }, [docId]);
  const editSaveProject = async () => {
    await editProjectFB(docId, { projectName, projectLink, projectDis });
  };
  return (
    <div className='w-full px-6 py-3 mt-4 bg-gray-100 shadow-md rounded-2xl'>
      {!editProject ? (
        <>
          <p className='font-sans text-3xl font-semibold text-black'>
            {projects?.title}
          </p>
          <p className='py-1 font-serif'>{projects.description}</p>
          <p>
            <span className='text-base italic font-medium text-black'>
              Project Link:
            </span>
            <a
              href={`${projects.link}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='font-mono text-xl text-blue-600 cursor-pointer'>
                {' '}
                <u>{projects.link}</u>
              </i>
            </a>
          </p>
        </>
      ) : (
        <>
          <input
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <p className='py-1 font-serif'>{projects.description}</p>
          <p>
            <span className='text-base italic font-medium text-black'>
              Project Link:
            </span>
            <a
              href={`${projects.link}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='font-mono text-xl text-blue-600 cursor-pointer'>
                {' '}
                <u>{projects.link}</u>
              </i>
            </a>
          </p>
        </>
      )}
      <button onClick={(e) => setProjectEdit(!editProject)}>
        Edit Project
      </button>
      <button onClick={editSaveProject}>Save Project</button>
    </div>
  );
}

export default Projects;
