import { useState } from 'react';
import Prefrences from './Prefrences';
import UserForm from './UserForm';
import Personalinfo from './Personalinfo';
import Submitted from './Submitted';
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
  //!Dont uncomment it
  // const userData = useUser();
  // console.log(userData);
  return (
    <div>
      {page === 0 && <UserForm />}
      {page === 1 && <Personalinfo />}
      {page === 2 && <Prefrences />}
      {page < 2 && <button onClick={pageIncrementer}>Next</button>}
      <br />
      {page <= 2 && page > 0 && <button onClick={pageDecrementer}>Prev</button>}
      {page === 2 && <button onClick={pageIncrementer}>Finish</button>}
      {page === 3 && <Submitted />}
    </div>
  );
}
