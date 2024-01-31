import style from "./profile.module.scss";
import avatar from "../../assets/icons/part-blurry-image.jpg";
import { connect } from "react-redux";
import { ProfileRequest } from "../../redux/actions/authActions";
import { User } from "../../interface/form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookies } from "../../utils/cookies";
import Dropdown from "../../components/Dropdown";

interface ProfileProps {
  ProfileRequest: () => void;
  data: User;
}

function Profile({ ProfileRequest, data }: ProfileProps) {
  const navigate = useNavigate();
  const edit = () => {
    navigate("/edit");
  };
  const handleLogout = () => {
    removeCookies("token");
    navigate("/");
  };
  useEffect(() => {
    if (!getCookie("token")) {
      navigate("/");
    }
  }, [navigate]);
  useEffect(() => {
    ProfileRequest();
  }, [ProfileRequest]);

  return (
    <>
      <div className="w-100 d-flex flex-row-reverse">
        <div className={style.dropSize}>
          <Dropdown handleLogout={handleLogout}></Dropdown>
        </div>
      </div>
      <div className="container d-flex justify-content-center align-items-center my-40  flex-column">
        <div className="mb-40 ">
          <h1 className="d-flex justify-content-center"> Personal info</h1>
          <p className="d-flex justify-content-center">
            Basic info, like your name and photo
          </p>
        </div>
        <div className={style.table}>
          <div className="d-flex flex-row justify-content-between align-items-center px-50 py-30 border-bottom">
            <div>
              <p className="fs-4 fw-nomal">Profile</p>
              <p className="fs-13 fw-medium text-content">
                Some info may be visible to other people
              </p>
            </div>
            <div>
              <button
                className="btn btn-outline-border-color px-6 py-2 text-content"
                onClick={edit}
              >
                Edit
              </button>
            </div>
          </div>
          <div className="d-flex flex-row align-items-center px-50 border-bottom py-12 fw-medium ">
            <p className="col-4 fs-13  mb-0 text-content ">PHOTO</p>
            <img
              className={style.imageSize}
              src={data.photo || avatar}
              alt="avatar"
            ></img>
          </div>
          <div className="d-flex flex-row align-items-center px-50 border-bottom py-12 fw-medium">
            <p className="col-4 fs-13  mb-0 text-content">NAME</p>
            <p className="fs-18">{data.name}</p>
          </div>
          <div className="d-flex flex-row align-items-center px-50 border-bottom py-12 fw-medium">
            <p className="col-4 fs-13  mb-0 text-content">BIO</p>
            <p className="fs-18">{data.bio}</p>
          </div>
          <div className="d-flex flex-row align-items-center px-50 border-bottom py-12 fw-medium">
            <p className="col-4 fs-13  mb-0 text-content">PHONE</p>
            <p className="fs-18">{data.phone}</p>
          </div>
          <div className="d-flex flex-row align-items-center px-50 border-bottom py-12 fw-medium">
            <p className="col-4 fs-13  mb-0 text-content">EMAIL</p>
            <p className="fs-18">{data.email}</p>
          </div>
          <div className="d-flex flex-row align-items-center px-50 border-bottom py-12 fw-medium">
            <p className="col-4 fs-13  mb-0 text-content">PASSWORD</p>
            <p className="fs-18">************</p>
          </div>
        </div>
      </div>
    </>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: any) => ({
  error: state.auth.error,
  data: state.auth.data,
});

const mapDispatchToProps = {
  ProfileRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
