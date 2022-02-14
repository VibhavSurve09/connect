import React from 'react';
function HeaderInformation({ status, name, profilePicture }) {
  return (
    <>
      <p>{name}</p>
      {status ? 'Online' : 'Offline'}
    </>
  );
}

export default React.memo(HeaderInformation);
