import style from "./form.module.scss";
import face from "../../assets/icons/face-icon.svg";
import google from "../../assets/icons/gg-icon.svg";
import git from "../../assets/icons/git-icon.svg";
import twitter from "../../assets/icons/twitter.svg";
import { Link } from "react-router-dom";
import { FormDatas } from "../../interface/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../../utils/validation";
import { useEffect, useState } from "react";
import classNames from "classnames";

interface Form {
  name: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmitHandler: () => void;
  formData: FormDatas;
  error: string;
}

function Form({ name, handleChange, onSubmitHandler, formData, error }: Form) {
  const [isBoderEmail, setIsBorderEmail] = useState<boolean>(true);
  const [isBoderPassword, setIsBorderPassword] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDatas>({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (errors.email?.message) {
      setIsBorderEmail(false);
    } else setIsBorderEmail(true);
    if (errors.password?.message) {
      setIsBorderPassword(false);
    } else setIsBorderPassword(true);
  }, [errors.email?.message, errors.password?.message]);
  const borderClassEmail = classNames({
    "input-group text-border-color border rounded-2": true,
    "border-danger": !isBoderEmail,
  });
  const borderClassPassword = classNames({
    "input-group text-border-color border rounded-2": true,
    "border-danger": !isBoderPassword,
  });
  return (
    <div className={style.containerForm}>
      <div className={style.w33}>
        <div className={style.content}>
          <form onSubmit={handleSubmit(onSubmitHandler)} className="">
            <h1 className="text-border-color">{name}</h1>
            <div className="d-flex flex-column mb-14">
              <div className={borderClassEmail}>
                <span
                  className="input-group-text bg-white p-12"
                  id="basic-addon1"
                >
                  <span className="material-symbols-outlined text-content">
                    mail
                  </span>
                </span>
                <input
                  {...register("email")}
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control border-start-0 ps-0 text-opacity-75"
                  placeholder="Email"
                />
              </div>
              {errors.email && (
                <p className="text-danger mt-0 ">{errors.email.message}</p>
              )}
            </div>
            <div className="d-flex flex-column mb-14">
              <div className={borderClassPassword}>
                <span
                  className="input-group-text bg-white p-12"
                  id="basic-addon1"
                >
                  <span className="material-symbols-outlined text-content">
                    lock
                  </span>
                </span>
                <input
                  type="password"
                  {...register("password")}
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control border border-start-0 ps-0 text-opacity-75"
                  placeholder="Password"
                />
              </div>
              {errors.password && (
                <p className="error-message text-danger">
                  {errors.password.message}
                </p>
              )}
            </div>
            {error && <p className="error-message text-danger">{error}</p>}
            <button type="submit" className="btn btn-primary w-100 py-2 my-4">
              {name}
            </button>
          </form>
          <p className="d-flex justify-content-center  text-content mb-4">
            or continue with these social profile
          </p>
          <div className={style.groupImage}>
            <img
              src={face}
              className="p-14 border rounded-circle text-border-color"
              alt="face book icon"
            ></img>
            <img
              src={google}
              className="p-14 border rounded-circle text-border-color"
              alt="google icon "
            ></img>
            <img
              src={git}
              className="p-14 border rounded-circle text-border-color"
              alt="git icon "
            ></img>
            <img
              src={twitter}
              className="p-14 border rounded-circle text-border-color"
              alt="twitter icon "
            ></img>
          </div>
          {name === "Register" ? (
            <p className="d-flex justify-content-center  text-content mb-4">
              Adready a member?{" "}
              <Link to="/login">
                <span className="text-decoration-none">Login</span>
              </Link>
            </p>
          ) : (
            <p className="d-flex justify-content-center  text-content mb-4">
              Don’t have an account yet?{" "}
              <Link to="/">
                <span className="text-decoration-none">Register</span>
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Form;
