import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/User';
import { addProject } from '../../services/firebase';
export default function ProjectForm() {
  const [projectTitle, setProjectTitle] = useState('');
  const [linkOfProject, setLinkOfProject] = useState('');
  const [description, setDescription] = useState('');
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
    setProjectTitle('');
    setLinkOfProject('');
    setDescription('');
  };
  return (
    <div className='px-4 py-5 bg-white sm:p-6'>
      <div>
        <label
          htmlFor='first-name'
          className='block py-1 text-lg font-semibold text-gray-700'
        >
          Tell Us About Your Past projects
        </label>
        <div className='w-full px-3 py-3 bg-gray-100 border-2 rounded-md shadow-lg'>
          <div className='flex flex-col'>
            <label className='block text-sm font-semibold text-gray-700'>
              Project Title
            </label>
            <input
              type='text'
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder='My Project'
              className='block w-full px-1 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            />
          </div>
          <div className='mt-3'>
            <label
              htmlFor='company-website'
              className='block text-sm font-semibold text-gray-700'
            >
              Link
            </label>
            <div className='flex mt-1 rounded-md shadow-sm'>
              <input
                type='url'
                value={linkOfProject}
                onChange={(e) => setLinkOfProject(e.target.value)}
                className='flex-1 block w-full px-1 py-2 border-2 border-gray-300 rounded-none focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md sm:text-sm'
                placeholder='www.myproject.in'
              />
            </div>
          </div>
          <div className='mt-3'>
            <label className='block text-sm font-semibold text-gray-700'>
              Project Description
            </label>
            <div className='mt-1'>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='block w-full px-1 py-2 mt-1 border-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                placeholder='Tell us about your project- the idea, technology used, solo/group project, duration etc.'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-end'>
        <button onClick={submitProject}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='w-6 h-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 6v6m0 0v6m0-6h6m-6 0H6'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
