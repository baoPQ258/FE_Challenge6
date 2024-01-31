import avatar from "../../assets/icons/part-blurry-image.jpg";
import style from "./message.module.scss";

interface MessageProps {
  message: string;
  name: string;
}

function Message({ message, name }: MessageProps) {
  return (
    <div className="d-flex align-items-center my-4 ">
      <img className={style.imgSize} src={avatar} alt=""></img>
      <div>
        <p className="text-content ms-30">{name}</p>
        <p className="text-white ms-30">{message}</p>
      </div>
    </div>
  );
}

export default Message;
