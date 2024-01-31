import style from "./change.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { FormDatas, User } from "../../interface/form";
import { useEffect, useState } from "react";
import { ProfileRequest } from "../../redux/actions/authActions";
import { UpdateProfileRequest } from "../../redux/actions/profileActions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validation";
import { removeCookies } from "../../utils/cookies";
import Dropdown from "../../components/Dropdown";
import UploadWidget from "../../components/UploadWidget";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ChangeInfoProp {
  data: User;
  errorUpdate: string;
  ProfileRequest: () => void;
  UpdateProfileRequest: (
    name: string,
    bio: string,
    phone: number,
    photo: string,
    email: string,
    password: string
  ) => void;
}

function ChangeInfo({
  data,
  ProfileRequest,
  UpdateProfileRequest,
  errorUpdate,
}: ChangeInfoProp) {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormDatas>({
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();
  const [name, setName] = useState<string>(data.name || "");
  const [email, setEmail] = useState<string>(data.email || "");
  const [bio, setBio] = useState<string>(data.bio || "");
  const [phone, setPhone] = useState<number>(data.phone || 0);
  const [password, setPassword] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [image, setImage] = useState<any>();
  const onSubmitHandler = () => {
    UpdateProfileRequest(
      name.trim(),
      bio.trim(),
      phone,
      image,
      email.trim(),
      password.trim() || ""
    );
    if (!errorUpdate) {
      toast.success(" Update success !", {
        position: "top-right",
      });
    } else {
      toast.error(" Update failed !", {
        position: "top-right",
      });
    }
  };
  useEffect(() => {
    ProfileRequest();
  }, [ProfileRequest]);
  const handleLogout = () => {
    removeCookies("token");
    navigate("/");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFile = (e: any) => {
    setImage(e?.target?.files[0]);
    const file = e?.target?.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_PRESETKEY);
    if (file.size / 1048576 < 5) {
      axios
        .post(import.meta.env.VITE_CLOUD_URL, formData)
        .then((res) => {
          setImage(res.data.secure_url);
        })
        .catch(() => {
          Error();
        });
    } else {
      return Error();
    }
  };

  return (
    <>
      <div className="w-100 d-flex flex-row-reverse">
        <div className={style.dropSize}>
          <Dropdown handleLogout={handleLogout}></Dropdown>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center my-40  flex-column">
        <Link to="/profile" className={style.back}>
          <span className="material-symbols-outlined">chevron_left</span>
          Back
        </Link>
        <div className={style.table}>
          <div className="d-flex flex-column justify-content-start px-50 py-30">
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div>
                <p className="fs-4 fw-nomal">Change Info</p>
                <p className="fs-13 fw-medium text-content">
                  Changes will be reflected to every services
                </p>
              </div>
              <div className="mt-4 pt-2 mb-18 fw-medium ">
                <UploadWidget
                  handleFile={handleFile}
                  image={data.photo || image}
                ></UploadWidget>
              </div>
              <div className={style.inputGroup}>
                <p className="mb-1 fs-13 fw-medium">NAME</p>
                <input
                  className="fs-13 form-control py-18 rounded-4 ps-18 border-dark"
                  placeholder="Enter your name..."
                  defaultValue={data.name || name}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setName(event.target.value)
                  }
                />
              </div>
              <div className={style.inputGroup}>
                <p className="mb-1 fs-13 fw-medium">BIO</p>
                <input
                  className="form-control fs-13 form-control py-18 rounded-4 ps-18 border-dark pb-70"
                  placeholder="Enter your bio..."
                  defaultValue={data.bio || bio}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setBio(event.target.value)
                  }
                ></input>
              </div>
              <div className={style.inputGroup}>
                <p className="mb-1 fs-13 fw-medium">PHONE</p>
                <input
                  className="fs-13 form-control py-18 rounded-4 ps-18 border-dark"
                  placeholder="Enter your phone..."
                  defaultValue={data.phone || phone}
                  type="number"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPhone(Number(event.target.value))
                  }
                />
              </div>
              <div className={style.inputGroup}>
                <p className="mb-1 fs-13 fw-medium">EMAIL</p>
                <input
                  className="fs-13 form-control py-18 rounded-4 ps-18 border-dark"
                  placeholder="Enter your email..."
                  defaultValue={data.email || email}
                  {...register("email")}
                  type="email"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(event.target.value)
                  }
                />
              </div>
              <div className={style.inputGroup}>
                <p className="mb-1 fs-13 fw-medium">PASSWORD</p>
                <input
                  type="password"
                  className="fs-13 form-control py-18 rounded-4 ps-18 border-dark"
                  placeholder="Enter your password..."
                  {...register("password")}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(event.target.value)
                  }
                />
              </div>
              <button
                onClick={onSubmitHandler}
                className="btn btn-primary py-2 px-4 mt-3"
                type="submit"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: any) => ({
  error: state.auth.error,
  errorUpdate: state.profile.error,
  data: state.auth.data,
});
const mapDispatchToProps = {
  ProfileRequest,
  UpdateProfileRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfo);
