import { useState } from "react";
import Prefrences from "./Prefrences";
import UserForm from "./UserForm";
import Personalinfo from "./Personalinfo";
import Submitted from "./Submitted";
import styles from "./Form.module.css";
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
    <div className="bg-gray-100">
      {page === 0 && <UserForm />}
      {page === 1 && <Personalinfo />}
      {page === 2 && <Prefrences />}
      <div className="gap-3">
        {page <= 2 && page >= 0 && (
          <button
            onClick={pageDecrementer}
            className="rounded-sm text-white bg-indigo-600 px-5 py-2"
          >
            Prev
          </button>
        )}
        {page < 2 && (
          <button
            onClick={pageIncrementer}
            className={`rounded-sm bg-indigo-600 text-white px-5 py-2 ${styles.buttonfix}`}
          >
            Next
          </button>
        )}
        {page === 2 && (
          <button
            onClick={pageIncrementer}
            className={`rounded-sm bg-indigo-600 text-white px-5 py-2 ${styles.buttonfix}`}
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
