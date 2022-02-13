import styles from './UserForm.module.css';
import { useState } from 'react';
import React from 'react';
import { mergeData } from '../../services/firebase';
function Personalinfo({ pageIncrementer }) {
  const [collegeName, setCollegeName] = useState('');
  const [degree, setDegree] = useState('Bachelors');
  const [collegeYear, setCollegeYear] = useState('1');
  const [specilization, setSpecilization] = useState('');
  const optionsForDegree = [
    {
      label: "Bachelor's",
      value: 'Bachelors',
    },
    {
      label: "Master's",
      value: 'Masters',
    },
    {
      label: 'PhD',
      value: 'PhD',
    },
    {
      label: 'Other',
      value: 'Other',
    },
  ];

  const optionsForYear = [
    {
      label: 'First Year',

      value: '1',
    },

    {
      label: 'Second Year',

      value: '2',
    },

    {
      label: 'Third Year',

      value: '3',
    },

    {
      label: 'Fourth Year',

      value: '4',
    },

    {
      label: 'Fifth Year',

      value: '5',
    },
  ];
  const handelForm = (e) => {
    e.preventDefault();
    const infoData = {
      collegeName,
      collegeYear,
      specilization,
      degree,
    };
    mergeData(infoData);
    pageIncrementer();
  };
  return (
    <div className='h-auto bg-gray-100'>
      <br />
      <br />
      <div className={styles.container}>
        <ul className={styles.pbar}>
          <li>step 1</li>
          <li className={styles.active}>step 2</li>
          <li>step 3</li>
        </ul>
      </div>

      <br />
      <br />
      <div className='w-full h-1 bg-gray-300 -mt-9 '>
        <div className={`bg-indigo-300 h-1 ${styles.hrr1}`}></div>
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
                Educational Qualifications
              </h3>
              <p className='px-2 mt-1 text-sm text-gray-600'>
                Tell us about your education.
              </p>
            </div>
          </div>
          <div className='mt-5 md:mt-0 md:col-span-2'>
            <form onSubmit={handelForm}>
              <div className='overflow-hidden shadow sm:rounded-md'>
                <div className='px-4 py-5 bg-white sm:p-6'>
                  <div className='grid grid-cols-6 gap-6'>
                    <div className='col-span-6 sm:col-span-4'>
                      <label className='block text-sm font-medium text-gray-700'>
                        College Name
                      </label>
                      <input
                        value={collegeName}
                        onChange={(e) => {
                          setCollegeName(e.target.value);
                        }}
                        type='text'
                        placeholder="St. Xavier's College, Mumbai"
                        className='block w-full px-1 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        required
                      />
                    </div>

                    <div className='col-span-6 sm:col-span-3'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Degree Type
                      </label>
                      <select
                        onChange={(e) => {
                          setDegree(e.target.value);
                        }}
                        className='block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      >
                        {optionsForDegree.map((type) => {
                          return (
                            <option key={type.label} value={type.value}>
                              {type.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className='col-span-6'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Specialization
                      </label>
                      <input
                        value={specilization}
                        onChange={(e) => {
                          setSpecilization(e.target.value);
                        }}
                        type='text'
                        className='block w-full px-1 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                        placeholder='Information Technology'
                        required
                      />
                    </div>
                    <div className='col-span-6 sm:col-span-3'>
                      <label className='block text-sm font-medium text-gray-700'>
                        Year
                      </label>
                      <select
                        onChange={(e) => {
                          setCollegeYear(e.target.value);
                        }}
                        className='block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      >
                        {optionsForYear.map((year) => {
                          return (
                            <option key={year.label} value={year.value}>
                              {year.label}
                            </option>
                          );
                        })}
                      </select>
                    </div>
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

export default React.memo(Personalinfo);
