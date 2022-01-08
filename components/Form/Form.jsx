import { useState } from "react";
import ProvidersForm from "./ProviderForm";
import Prefrences from "./Prefrences";
import UserForm from "./UserForm";
import { useRouter } from "next/router";
import { getAuth } from "@firebase/auth";
import app from "../../lib/firebase";
import { doesUserDataExist } from "../../services/auth";
import { useUser } from "../../hooks/useUser";
import Personalinfo from "./Personalinfo";
import Submitted from "./submitted";
//TODO: Creating Silder Form
export default function Form() {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const auth = getAuth(app);
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
