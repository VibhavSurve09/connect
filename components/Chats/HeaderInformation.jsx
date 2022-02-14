import React from 'react';
function HeaderInformation({ status, name, profilePicture }) {
  console.log(status);
  return (
    <>
      <p>{name}</p>
      {status ? 'Online' : 'Offline'}
    </>
  );
}

export default React.memo(HeaderInformation);
