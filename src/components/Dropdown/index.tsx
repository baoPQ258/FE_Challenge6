import avatar from "../../assets/icons/part-blurry-image.jpg";
import style from "./dropdown.module.scss";

interface DropdownProp {
  handleLogout: () => void;
}

function Dropdown({ handleLogout }: DropdownProp) {
  return (
    <div className=" d-flex align-items-end my-18 me-3">
      <div className="btn-group my-0 w-100  ">
        <div
          className="d-flex flex-row justify-content-between align-items-center w-100"
          data-bs-toggle="dropdown"
        >
          <div className="d-flex align-items-center ">
            <img className={style.imgSize} src={avatar} alt=""></img>
            <p className="text-dark  ms-30">Name</p>
          </div>
          <div className="dropdown-toggle bg-transparent boder-0 text-dark"></div>
        </div>
        <ul className="dropdown-menu bg-white">
          <li>
            <a
              className="dropdown-item d-flex align-items-center text-dark"
              href="/profile"
            >
              <span className="material-symbols-outlined me-3 ">
                account_circle
              </span>
              Profile
            </a>
          </li>
          <li>
            <a
              className="dropdown-item d-flex align-items-center text-dark"
              href="/home"
            >
              <span className="material-symbols-outlined me-3">group</span>
              Group Chat
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li onClick={handleLogout}>
            <a
              className="dropdown-item d-flex align-items-center text-danger"
              href="/"
            >
              <span className="material-symbols-outlined me-3">logout</span>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dropdown;
