/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Form from "../../components/Form";
import { FormDatas } from "../../interface/form";
import { connect } from "react-redux";
import { registerRequest } from "../../redux/actions/authActions";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookies";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface RegisterProps {
  registerRequest: (email: string, password: string) => void;
  error: string;
}
function Register({ registerRequest, error }: RegisterProps) {
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
    await registerRequest(formData.email, formData.password);
    setTimeout(() => {
      const token = getCookie("token");
      if (token) {
        toast.success(" Register success !", {
          position: "top-right",
        });
        navigate("/profile");
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
      <div>
        <Form
          error={error}
          handleChange={handleChange}
          onSubmitHandler={handleSubmit}
          formData={formData}
          name={"Register"}
        ></Form>
      </div>
    </>
  );
}
const mapStateToProps = (state: any) => ({
  error: state.auth.error,
});

const mapDispatchToProps = {
  registerRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
