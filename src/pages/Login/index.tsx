import { useEffect, useState } from "react";
import Form from "../../components/Form";
import { FormDatas } from "../../interface/form";
import { loginRequest } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import { getCookie } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  loginRequest: (email: string, password: string) => void;
  error: string;
}

function Login({ loginRequest, error }: LoginProps) {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      navigate("/profile");
    }
  }, [navigate]);
  const [formData, setFormData] = useState<FormDatas>({
    email: "",
    password: "",
  });
  const handleSubmit = async () => {
    await loginRequest(formData.email, formData.password);
    setTimeout(() => {
      const token = getCookie("token");
      if (token) {
        navigate("/home");
      }
    }, 1000);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Form
        error={error}
        handleChange={handleChange}
        onSubmitHandler={handleSubmit}
        formData={formData}
        name={"Login"}
      ></Form>
    </>
  );
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (state: any) => ({
  token: state.auth.token,
  error: state.auth.error,
});

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
