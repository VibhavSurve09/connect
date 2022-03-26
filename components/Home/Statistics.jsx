import { useEffect, useState } from 'react';
import { useShowCount } from '../../hooks/useShowCount';
import {
  getCountOfPosts,
  getCountOfProjects,
  getCountOfUsers,
} from '../../services/firebase';
import { getAllSkills } from '../../services/neo4j';
export default function Statistics() {
  const [activeusers, setActiveusers] = useState(0);
  const [projects, setProjects] = useState(0);
  const [ideas, setIdeas] = useState(0);
  const [skillsCount, setSkillsCount] = useState(40);
  useEffect(() => {
    getCountOfUsers().then((c) => {
      setActiveusers(c - 1);
    });
    getCountOfPosts().then((c) => {
      setIdeas(c - 1);
    });
    getCountOfProjects().then((c) => {
      setProjects(c - 1);
    });
    getAllSkills().then((arr) => {
      setSkillsCount(arr.length - 1);
    });
  }, []);
  return (
    <div className='z-20 px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20'>
      <div className='grid grid-cols-2 row-gap-8 md:grid-cols-4'>
        <div className='text-center'>
          <h6 className='text-3xl font-bold text-deep-purple-accent-400'>
            {activeusers}+
          </h6>
          <p className='font-bold'>Users</p>
        </div>
        <div className='text-center'>
          <h6 className='text-3xl font-bold text-deep-purple-accent-400'>
            {skillsCount}+
          </h6>
          <p className='font-bold'>Skills to Choose</p>
        </div>
        <div className='text-center'>
          <h6 className='text-3xl font-bold text-deep-purple-accent-400'>
            {ideas}+
          </h6>
          <p className='font-bold'>Ideas Shared</p>
        </div>
        <div className='text-center'>
          <h6 className='text-3xl font-bold text-deep-purple-accent-400'>
            {projects}+
          </h6>
          <p className='font-bold'>Projects Shared</p>
        </div>
      </div>
    </div>
  );
}
