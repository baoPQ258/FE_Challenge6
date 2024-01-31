import avatar from "../../assets/icons/part-blurry-image.jpg";
import style from "./userDetail.module.scss";

interface UserDetailProps {
  name: string;
  img: string;
}

function UserDetail({ name, img }: UserDetailProps) {
  return (
    <div className="d-flex align-items-center mt-4 ">
      <img className={style.imgSize} src={img || avatar} alt=""></img>
      <p className="text-white  ms-30">{name}</p>
    </div>
  );
}

export default UserDetail;
