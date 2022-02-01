import styles from './UserForm.module.css';
import Fireworks from '../Confetti/Confetti';
import React from 'react';
function Submitted() {
  return (
    <div className='grid items-center h-screen justify-items-center'>
      <div>
        <div>
          <Fireworks />
        </div>
        <p
          className={`md:text-2xl sm:text-xl lg:text-4xl text-center align-middle ${styles.subtext}`}
        >
          Your ConnectU account has been succesfully created!
        </p>
        <br />
        <p className='text-center align-middle lg:text-2xl'>
          Click{' '}
          <button className='text-blue-600'>
            <u>
              {' '}
              <i>here</i>
            </u>
          </button>{' '}
          to go to your profile
        </p>
      </div>
    </div>
  );
}

export default React.memo(Submitted);
