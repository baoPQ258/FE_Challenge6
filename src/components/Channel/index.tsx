/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import style from "./channel.module.scss";
import User from "../UserDetail";
import Groups from "../Group";
import { removeCookies } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import {
  CreatGroupRequest,
  GetGroupRequest,
  UpdateGroupRequest,
} from "../../redux/actions/socketActions";
import { connect } from "react-redux";
import { socket } from "../../utils/socket";
import { Group } from "../../interface/form";

interface ChannelProps {
  CreatGroupRequest: (
    name: string,
    title: string,
    userName: string,
    image: string
  ) => void;
  GetGroupRequest: () => void;
  userName: string;
  dataGroup: any;
  groupId: any;
  setGroupId: React.Dispatch<any>;
  UpdateGroupRequest: (
    groupId: string,
    name: string,
    message: string,
    img: string
  ) => void;
  img: string;
}

function Channel({
  CreatGroupRequest,
  GetGroupRequest,
  UpdateGroupRequest,
  userName,
  dataGroup,
  groupId,
  setGroupId,
  img,
}: ChannelProps) {
  const [isHeader, setIsHeader] = useState(false);
  const [name, setName] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const navigate = useNavigate();

  const handleHeader = () => {
    setIsHeader(false);
  };
  const handleLogout = () => {
    removeCookies("token");
    navigate("/register");
  };
  const handleCreate = () => {
    CreatGroupRequest(name, title, userName, img);
    setTimeout(() => {
      GetGroupRequest();
    }, 1000);
    socket?.emit("create group", userName, name);
  };
  const handleOnclick = (gid?: string) => {
    const foundGroup = dataGroup.find((item: Group) => item._id === gid);
    setGroupId(foundGroup);
    if (gid) {
      UpdateGroupRequest(gid, userName, "", img);
    }
    GetGroupRequest();
    setIsHeader(true);
  };
  useEffect(() => {
    GetGroupRequest();
  }, [GetGroupRequest]);

  return (
    <>
      <div className={style.wrapper}>
        <div className="container d-flex flex-column  justify-content-between h-100">
          <div>
            <div className={style.header}>
              {isHeader ? (
                <div
                  onClick={handleHeader}
                  className="text-white fw-bold d-flex align-items-center py-3"
                >
                  <span className="material-symbols-outlined pe-15">
                    chevron_left
                  </span>
                  All channels
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-between  align-items-center">
                    <div className="text-white fw-bold  py-3 ">Channels</div>
                    <div>
                      <button
                        className="btn btn-dark p-0"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <span className="material-symbols-outlined  p-1">
                          add
                        </span>
                      </button>
                      <div
                        className="modal fade "
                        id="exampleModal"
                        tabIndex={-1}
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog ">
                          <div className="modal-content bg-dark">
                            <div className="modal-header">
                              <h1
                                className="modal-title fs-5 text-white"
                                id="exampleModalLabel"
                              >
                                New Channel
                              </h1>
                              <button
                                type="button"
                                className="btn-close bg-white"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="mb-3">
                                  <input
                                    type="text"
                                    className="form-control mt-4 bg-bgInput border border-0 text-white"
                                    id="recipient-name"
                                    placeholder="Channel name"
                                    onChange={(
                                      event: React.ChangeEvent<HTMLInputElement>
                                    ) => setName(event.target.value)}
                                  />
                                </div>
                                <div className="mb-3">
                                  <textarea
                                    className="form-control mt-4 bg-bgInput border border-0 text-white"
                                    id="message-text"
                                    placeholder="Channel Description"
                                    rows={4}
                                    onChange={(
                                      event: React.ChangeEvent<HTMLTextAreaElement>
                                    ) => setTitle(event.target.value)}
                                  ></textarea>
                                </div>
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={handleCreate}
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={style.body}>
                    <div className="input-group mb-14 text-border-color bg-content rounded-3 ">
                      <span
                        className="input-group-text bg-content border-content p-12"
                        id="basic-addon1"
                      >
                        <span className="material-symbols-outlined text-white">
                          search
                        </span>
                      </span>
                      <input
                        type="text"
                        className="form-control bg-content border border-content border-start-0 ps-0 text-opacity-75"
                        placeholder="Search"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            {isHeader ? (
              <div>
                <div className="mx-3 mt-4">
                  <p className="text-white fw-bold fs-18">{groupId?.name}</p>
                  <p className="text-white fs-18 mt-3">{groupId?.title}</p>
                </div>
                <div className="text-white fw-bold fs-18 mt-5">MEMBER</div>
              </div>
            ) : null}
            <div className="mt-30">
              {dataGroup && isHeader ? (
                groupId?.members?.map((items: string, index: number) => {
                  return <User img={img} name={items} key={index}></User>;
                })
              ) : (
                <></>
              )}
              {Array.isArray(dataGroup) && dataGroup.length > 0 && !isHeader
                ? dataGroup.map((item: Group, index: number) => (
                    <div key={index} onClick={() => handleOnclick(item?._id)}>
                      <Groups name={item.name}></Groups>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <div className=" d-flex align-items-end my-18 ">
            <div className="btn-group my-0 w-100  ">
              <div
                className="d-flex flex-row justify-content-between align-items-center w-100"
                data-bs-toggle="dropdown"
              >
                <User img={img} name={userName}></User>
                <div className="dropdown-toggle bg-transparent boder-0 text-white"></div>
              </div>
              <ul className="dropdown-menu bg-bgDrop">
                <li>
                  <a
                    className="dropdown-item d-flex align-items-center text-white"
                    href="/profile"
                  >
                    <span className="material-symbols-outlined me-3 ">
                      account_circle
                    </span>
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li onClick={handleLogout}>
                  <a
                    className="dropdown-item d-flex align-items-center text-white"
                    href="#"
                  >
                    <span className="material-symbols-outlined me-3">
                      logout
                    </span>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
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
  dataGroup: state.socket.data,
});
const mapDispatchToProps = {
  CreatGroupRequest,
  GetGroupRequest,
  UpdateGroupRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Channel);
