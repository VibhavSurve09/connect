import React, { useEffect, useState } from 'react';
import { getProjects } from '../../services/firebase';

function Projects({ docId }) {
  const [projects, setProjects] = useState({});
  useEffect(() => {
    getProjects(docId).then((pro) => {
      setProjects(pro);
    });
  }, []);
  return (
    <div>
      <p className='text-black'>Title: {projects?.title}</p>
      <p>Link: {projects.link}</p>
      <p>Des:{projects.description}</p>
    </div>
  );
}

export default Projects;
