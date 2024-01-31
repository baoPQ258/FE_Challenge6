import { useNavigate } from "react-router-dom";
import Channel from "../../components/Channel";
import style from "./home.module.scss";
import { useEffect, useState } from "react";
import { getCookie } from "../../utils/cookies";
import Chat from "../../components/Chat";
import { connect } from "react-redux";
import { ProfileRequest } from "../../redux/actions/authActions";
import { User } from "../../interface/form";

interface HomeProps {
  data: User;
  ProfileRequest: () => void;
}

function Home({ ProfileRequest, data }: HomeProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [groupId, setGroupId] = useState<any>();
  const navigate = useNavigate();
  useEffect(() => {
    ProfileRequest();
    if (!getCookie("token")) {
      navigate("/");
    }
  }, [ProfileRequest, navigate]);
  return (
    <div className={style.wrapper}>
      <div className={style.channel}>
        <Channel
          setGroupId={setGroupId}
          groupId={groupId}
          userName={data?.name || ""}
          img={data?.photo || ""}
        ></Channel>
      </div>
      <div className={style.chat}>
        <Chat
          img={data?.photo || ""}
          groupId={groupId}
          name={data.name || ""}
        ></Chat>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
