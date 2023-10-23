import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { handleActivate } from "../services/userService";
import { useDispatch } from "react-redux";
import { logout, register } from "../features/userSlice";

const ActivateAccount = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activationToken = searchParams.get("activationToken");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleActivateAccount = async () => {
      try {
        const response = await handleActivate(activationToken);
        toast.success(response.message);
        dispatch(
          register({ user: response.payload.user, token: response.payload.token, isLoggedIn: true })
        );

        localStorage.setItem("user", JSON.stringify(response.payload.user));
        console.log(response);
        navigate("/");
      } catch (error) {
        dispatch(logout());
        // toast.error(error.response.data.message);
        console.log(error);
      }
    };
    handleActivateAccount();
  }, [activationToken]);

  return <div>token : {activationToken}</div>;
};

export default ActivateAccount;
