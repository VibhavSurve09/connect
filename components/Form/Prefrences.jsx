import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './UserForm.module.css';
export default function Prefrences() {
  let cancelToken;
  const [searchSkillData, setSearchSkillData] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const onType = async (e) => {
    setSearchSkill(e.target.value);
    let skillData;
    if (typeof cancelToken != typeof undefined) {
      cancelToken.cancel('Canceling');
    }
    cancelToken = axios.CancelToken.source();
    if (searchSkill != '') {
      skillData = await axios.get(
        `http://localhost:3000/api/skills/${searchSkill}`,
        { cancelToken: cancelToken.token }
      );
      setSearchSkillData(skillData.data);
    }
  };
  const addSkill = (skill) => {
    setSelectedSkills((oldSkills) => [...oldSkills, skill]);
    setSearchSkill('');
    console.log(selectedSkills);
  };
  return (
    <div className='h-auto bg-gray-100'>
      <br />
      <br />
      <div className={styles.container}>
        <ul className={styles.pbar}>
          <li>step 1</li>
          <li>step 2</li>
          <li className={styles.active}>step 3</li>
        </ul>
      </div>

      <br />
      <br />
      <div className='w-full h-1 bg-gray-300 -mt-9 '>
        <div className={`bg-indigo-300 h-1 ${styles.hrr2}`}></div>
      </div>
      <br />
      <br />
      <br />
      <div className={`mt-10 sm:mt-0 max-w-screen-xl ${styles.form1}`}>
        <div className={`hidden sm:block `} aria-hidden='true'>
          <div className='py-5'>
            <div className='border-t border-gray-200' />
          </div>
        </div>
        <div className='md:grid md:grid-cols-3 md:gap-6'>
          <div className='md:col-span-1'>
            <div className='px-4 sm:px-0'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Skills
              </h3>
              <p className='mt-1 text-sm text-gray-600'>
                Tell us about your skills and interests.
              </p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form action='#' method='POST'>
              <div className='overflow-hidden shadow sm:rounded-md'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='first-name'
                        className='block text-sm font-medium text-gray-700'
                      >
                        Search
                      </label>
                      <input
                        type='text'
                        value={searchSkill}
                        onChange={onType}
                        className='block w-full px-1 py-2 mt-1 rounded-md shadow-sm sm:text-sm'
                      />
                    </div>
                  </div>
                  <div className='block w-2/4 mt-1 border-black shadow-sm sm:text-sm'>
                    <select className='w-full py-2 bg-indigo-200'>
                      {searchSkillData.length > 0 &&
                        searchSkillData.map((skill) => {
                          return (
                            <option
                              className='font-lg'
                              key={skill.id}
                              value={skill.name}
                              onClick={() => {
                                addSkill(skill);
                              }}
                            >
                              {skill.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <div className='w-full bg-red-400'>
                    {selectedSkills.length > 0 &&
                      selectedSkills.map((skill) => {
                        return (
                          <p key={skill.id}>Your skills are {skill.name}</p>
                        );
                      })}
                  </div>
                </div>
                <div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
                  <button
                    type='submit'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Save
                  </button>
                </div>
              </div>
              <div className={`hidden sm:block `} aria-hidden='true'>
                <div className='py-5'>
                  <div className='border-t border-gray-200' />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
