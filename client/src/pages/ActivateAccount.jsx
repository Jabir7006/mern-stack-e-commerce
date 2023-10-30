import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { failLogin, startLogin, successLogin } from "../redux/features/userslice";
import { handleActivate } from "../services/userService";

const ActivateAccount = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get("accessToken");
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleActivateAccount = async () => {
      try {
        dispatch(startLogin());
        const response = await handleActivate(accessToken);
        toast.success(response.message);
        dispatch(successLogin(response.payload));

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        toast("❌ " + error.response.data.message);
        console.log(error);
        dispatch(failLogin(error.response.data.message));
      }
    };
    handleActivateAccount();
  }, [accessToken]);

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <p className="text-2xl font-bold">Account Activating...</p>
      ) : (
        <p className={`text-2xl font-bold ${error ? "text-red-500" : ""}`}>
          {error ? (
            "❌ Activation Failed"
          ) : (
            <div>
              <p>✔ Account Activated Successfully</p>
              <p className="text-[.95rem] mt-5 text-center font-normal">Redirecting...</p>
            </div>
          )}
        </p>
      )}
    </div>
  );
};

export default ActivateAccount;
