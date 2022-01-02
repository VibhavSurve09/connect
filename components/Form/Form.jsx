import { useState } from 'react';
import ProvidersForm from './ProviderForm';
import Prefrences from './Prefrences';
import UserForm from './UserForm';
import { useRouter } from 'next/router';
import { getAuth } from '@firebase/auth';
import app from '../../lib/firebase';
import { doesUserDataExist } from '../../services/auth';
import { useUser } from '../../hooks/useUser';
import Personalinfo from "./Personalinfo"
//TODO: Creating Silder Form
export default function Form() {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const auth = getAuth(app);
  const pageIncrementer = () => {
    if (page < 0 && page > 3) return;
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
      {page === 0 && <ProvidersForm />}
      {page === 1 && <UserForm />}
      {page === 2 && <Personalinfo/>}
      {page === 3 && <Prefrences />}
      {page < 3 && <button onClick={pageIncrementer}>Next</button>}
      <br />
      {page <= 3 && page > 0 && <button onClick={pageDecrementer}>Prev</button>}
      {page === 3 && <button>Finish</button>}
    </div>
  );
}
