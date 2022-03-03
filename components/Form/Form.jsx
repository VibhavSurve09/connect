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

  return (
    <div className="bg-gray-100">
      {page === 0 && <UserForm pageIncrementer={pageIncrementer} />}
      {page === 1 && <Personalinfo pageIncrementer={pageIncrementer} />}
      {page === 2 && <Prefrences pageIncrementer={pageIncrementer} />}
      <div className="grid grid-cols-1 my-1 md:flex md:justify-center md:space-x-28 md:items-center">
        <br />
      </div>
      {page === 3 && <Submitted />}
    </div>
  );
}
