import { FaQuestion } from "react-icons/fa";
import { Link } from "react-router-dom";
import {FC} from "react";

export const AboutIconLink: FC = () => {
  return (
    <div className='about-link'>
      <Link
        to={{
          pathname: "/about",
          search: "?sort=name",
        }}
      >
        <FaQuestion size={30} />
      </Link>
    </div>
  );
};
