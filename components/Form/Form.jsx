import { useState } from 'react';
import Prefrences from './Prefrences';
import UserForm from './UserForm';
import Personalinfo from './Personalinfo';
import Submitted from './Submitted';
import styles from './Form.module.css';
export default function Form() {
  const [page, setPage] = useState(0);
  const pageIncrementer = () => {
    if (page < 0 && page > 4) return;
    setPage(page + 1);
  };

  const pageDecrementer = () => {
    if (page < 0) return;
    setPage(page - 1);
  };

  return (
    <div className='bg-gray-100'>
      {page === 0 && <UserForm pageIncrementer={pageIncrementer} />}
      {page === 1 && <Personalinfo pageIncrementer={pageIncrementer} />}
      {page === 2 && <Prefrences pageIncrementer={pageIncrementer} />}
      <div className='grid grid-cols-1 my-1 md:flex md:justify-center md:space-x-28 md:items-center'>
        {page <= 2 && page > 0 && (
          <button
            onClick={pageDecrementer}
            className='w-20 px-5 py-1 text-white bg-indigo-600 rounded-full'
          >
            Prev
          </button>
        )}
        {page < 2 && (
          <button
            onClick={pageIncrementer}
            className={` bg-indigo-600 px-5 text-white mt-1 rounded-full py-1 w-20`}
          >
            Next
          </button>
        )}
        {page === 2 && (
          <button
            onClick={pageIncrementer}
            className={`px-5 py-1 text-white bg-indigo-600 rounded-full w-20 `}
          >
            Finish
          </button>
        )}

        <br />
      </div>
      {page === 3 && <Submitted />}
    </div>
  );
}
