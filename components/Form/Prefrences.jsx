import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/User';
import styles from './UserForm.module.css';
const jwt = require('jsonwebtoken');
export default function Prefrences() {
  let cancelToken;
  const activeUser = useContext(UserContext);
  const [searchSkillData, setSearchSkillData] = useState([]);
  const [searchSkill, setSearchSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  let token;
  try {
    token = jwt.sign(
      { uid: activeUser.uid, email: activeUser.email },
      process.env.JWT_SECRET
    );
  } catch {
    console.log('Err..');
    token = jwt.sign(
      { uid: activeUser?.uid, email: activeUser?.email },
      process.env.JWT_SECRET
    );
  }

  const reqBody = {
    uid: activeUser?.uid,
    email: activeUser?.email,
  };
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
    const id = skill.split(',')[0];
    const name = skill.split(',')[1];
    const skillArr = { id: Number(id), name };
    if (name != '') {
      let doesExist = true;

      for (let i = 0; i < selectedSkills.length; i++) {
        if (selectedSkills[i].name == skillArr.name) {
          doesExist = false;
          break;
        }
      }
      if (doesExist) setSelectedSkills((oldArr) => [...oldArr, skillArr]);
    }
    setSearchSkill('');
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    selectedSkills.map(async (skill) => {
      const skillWithUser = {
        userId: activeUser.uid,
        skillId: skill.id,
      };
      await axios.post(
        'http://localhost:3000/api/skills/user-skill',
        { skillWithUser, reqBody },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    });
  };
  const removeSkill = (skill) => {
    selectedSkills.splice(
      selectedSkills.findIndex((i) => i.id == skill.id),
      1
    );
    setSelectedSkills([...selectedSkills]);
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
              <h3 className='px-2 text-lg font-medium leading-6 text-gray-900'>
                Skills
              </h3>
              <p className='px-2 mt-1 text-sm text-gray-600'>
                Tell us about your skills and interests.
              </p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form onSubmit={handleSubmit}>
              <div className='overflow-hidden shadow sm:rounded-md'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-3'>
                      <label
                        htmlFor='first-name'
                        className='block py-1 text-sm font-semibold text-gray-700'
                      >
                        Search A Skill
                      </label>
                      <input
                        type='text'
                        value={searchSkill}
                        onChange={onType}
                        className='block w-full px-1 py-2 rounded-md shadow-sm sm:text-sm'
                      />
                    </div>
                  </div>
                  {/* //TODO:Bug in here */}
                  <div className='block w-2/4 py-2 mt-1 border-black shadow-sm sm:text-sm'>
                    <select
                      className='w-full py-2 bg-gray-200'
                      onChange={(e) => {
                        addSkill(e.target.value);
                      }}
                      onClick={(e) => {
                        addSkill(e.target.value);
                      }}
                    >
                      {searchSkillData.length > 0 &&
                        searchSkillData.map((skill) => {
                          return (
                            <option
                              className='font-lg'
                              key={skill.id}
                              value={`${skill.id},${skill.name}`}
                            >
                              {skill.name}
                            </option>
                          );
                        })}
                    </select>
                  </div>
                  <p className='py-4 font-mono underline'>
                    Your Selected Skills Are:
                  </p>
                  <div className='flex flex-row flex-wrap'>
                    {/* TODO:Make this New component */}
                    {selectedSkills.length > 0 &&
                      selectedSkills.map((skill) => {
                        return (
                          <div key={skill.id} className='group'>
                            <p className='px-4 py-2 mt-2 ml-2 font-semibold bg-indigo-200 rounded-md w-fit'>
                              {skill.name}
                              <button
                                onClick={() => {
                                  removeSkill({
                                    id: skill.id,
                                    name: skill.name,
                                  });
                                }}
                                className='invisible px-2 group-hover:visible'
                              >
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='w-6 h-6'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                >
                                  <path d='M6 18L18 6M6 6l12 12' />
                                </svg>
                              </button>
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
                  <button
                    type='submit'
                    disabled={selectedSkills.length === 0}
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
