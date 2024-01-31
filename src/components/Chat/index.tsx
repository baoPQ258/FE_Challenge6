/* eslint-disable @typescript-eslint/no-explicit-any */
import style from "./chat.module.scss";
import { useEffect, useState } from "react";
import Message from "../Message";
import { socket } from "../../utils/socket";
import { connect } from "react-redux";
import { UpdateGroupRequest } from "../../redux/actions/socketActions";
import { Messages } from "../../interface/form";

interface ChatProps {
  name: string;
  groupId: any;
  img: string;
  UpdateGroupRequest: (
    groupId: string,
    name: string,
    message: string,
    image: string
  ) => void;
}

function Chat({ name, groupId, UpdateGroupRequest, img }: ChatProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  useEffect(() => {
    socket.on("messageReceived", (message: string) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  const handleOnclick = () => {
    if (newMessage.trim()) {
      socket.emit("messageReceived", newMessage);
      setNewMessage("");
      UpdateGroupRequest(groupId._id, name, newMessage, img);
    }
  };
  return (
    <div className={style.wrapper}>
      <div className="container d-flex flex-column  justify-content-between h-100 mx-0 px-0">
        <div>
          <div className={style.header}>
            <p className="text-white fw-bold ps-30 py-3">
              {groupId?.name || "Welcome"}
            </p>
          </div>
          <div className="mx-70 mt-30">
            {messages.map((item, index: number) => {
              return <Message key={index} name={name} message={item}></Message>;
            })}
            {groupId?.messages.map((item: Messages, index: number) => {
              return (
                <Message
                  key={index}
                  name={item.name}
                  message={item.text}
                ></Message>
              );
            })}
          </div>
        </div>
        <div className="mx-70">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control bg-bgInput text-white border-0 py-3"
              placeholder="Type a message here"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setNewMessage(e.target.value);
              }}
            />
            <button
              className="btn btn-primary d-flex align-items-center"
              type="button"
              id="button-addon2"
              onClick={handleOnclick}
            >
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: any) => ({
  dataGroup: state.socket.data,
});
const mapDispatchToProps = {
  UpdateGroupRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
