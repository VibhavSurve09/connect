import React, { memo } from 'react';

function ActiveUserCount({ count }) {
  return (
    <p className='px-2 mx-1 tracking-widest text-right'>
      Current Active:{count}
    </p>
  );
}

export default memo(ActiveUserCount);
