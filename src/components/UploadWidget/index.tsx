import avatar from "../../assets/icons/part-blurry-image.jpg";
import style from "./upload.module.scss";

interface UploadWidgetProps {
  image: string | undefined;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleFile: (e: any) => void;
}

function UploadWidget({ image, handleFile }: UploadWidgetProps) {
  return (
    <>
      <label>
        <div className="d-flex flex-row align-items-center">
          <img
            className={style.imageSize}
            src={image || avatar}
            alt="image"
          ></img>
          <p className="ms-4 fs-13  mb-0 text-content ">CHANGE PHOTO</p>
        </div>
        <input
          type="file"
          name="image"
          className="input-image"
          onChange={handleFile}
          hidden
        ></input>
      </label>
    </>
  );
}

export default UploadWidget;
