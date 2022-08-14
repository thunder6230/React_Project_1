import { Link } from "react-router-dom";
import Card from "../Components/shared/Card";
import {FC} from "react";

export const AboutPage: FC = () => {
  return (
    <Card>
      <h1>About this Project</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores in
        temporibus velit. Minima illo ipsum enim optio. Aspernatur neque
        excepturi fuga atque. Iure assumenda nam delectus, eius aspernatur modi
        amet.
      </p>
      <p>
        <Link to='/'>Home</Link>
      </p>
    </Card>
  );
};
