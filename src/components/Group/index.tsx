import style from "./group.module.scss";
import Avatar from "react-avatar";

interface GroupProps {
  name: string;
}

function Group({ name }: GroupProps) {
  return (
    <>
      <div className="d-flex align-items-center mt-30">
        <Avatar
          name={name}
          className={style.imgSize}
          size="42px"
          round="7px"
          maxInitials={1}
          textSizeRatio={2}
          value="56%"
        />
        <p className="text-white  ms-30">{name}</p>
      </div>
    </>
  );
}

export default Group;
