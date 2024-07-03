import { Form, Link, useActionData } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

//components
import { FormInput } from "../components";

import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import { useGoogle } from "../hooks/useGoogle";

function themeFromLocalStorage() {
  return localStorage.getItem("theme") || "winter";
}

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");

  return { email, password };
};

function Login() {
  const [forgetPassword, setForgetPassword] = useState(true);
  const [errorStatus, setErrorStatus] = useState({
    email: "",
    password: "",
  });

  const userData = useActionData();
  const { signInWithEmail, isPending } = useLogin();

  const [theme, setTheme] = useState(themeFromLocalStorage());
  const handleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (userData) {
      if (userData?.email.trim() && userData.password?.trim()) {
        signInWithEmail(userData.email, userData.password);
      }

      if (!userData.email.trim()) {
        setErrorStatus((prev) => {
          return { ...prev, email: "input-error" };
        });
      }

      if (!userData.password?.trim()) {
        setErrorStatus((prev) => {
          return { ...prev, password: "input-error" };
        });
      }

      if (!forgetPassword && userData) {
        sendPasswordResetEmail(auth, userData.email.trim())
          .then(() => {
            toast.success("Link send");
          })
          .catch((error) => {
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
      }
    }
  }, [userData]);

  let { handleGoogle } = useGoogle();
  return (
    <>
      <video
        autoPlay
        loop
        muted
        className=" bg-cover h-screen absolute -z-10 opacity-70 object-cover w-full "
        src="/bg-video.mp4"
      ></video>
      <div className="grid">
        <div className="grid place-items-center min-h-screen">
          <Form
            method="post"
            className="flex flex-col items-center gap-4 card bg-base-100 w-96 shadow-xl p-5"
          >
            <h1 className="text-4xl font-semibold">Login</h1>
            <FormInput
              type="email"
              name="email"
              labelText="email"
              status={errorStatus.email}
              placeholder="example@gmail.com"
            />
            {forgetPassword && (
              <FormInput
                type="password"
                name="password"
                labelText="password"
                status={errorStatus.password}
                placeholder="*******"
              />
            )}

            <div className="w-full">
              {!isPending && (
                <button className="btn btn-primary btn-block">
                  {forgetPassword ? "Submit" : "Send link"}
                </button>
              )}
              {isPending && (
                <button disabled className="btn btn-primary btn-block">
                  Loading...
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  handleGoogle();
                }}
                className="btn btn-primary btn-block mt-2"
              >
                {" "}
                Google
              </button>
            </div>
            <div className="text-center">
              Don't have an account?{" "}
              <Link className="link link-primary" to="/register">
                Register
              </Link>
            </div>
            <div className="text-end">
              <Link
                onClick={() => setForgetPassword(!forgetPassword)}
                type="btn"
                className="link link-primary"
              >
                Forgot password?
              </Link>
              {/* {!isPending && (
                <Link
                  onClick={() => setForgetPassword(!forgetPassword)}
                  type="btn"
                  className="link link-primary"
                >
                  Forgot password?
                </Link>
              )}
              {isPending && (
                <Link disabled className="link link-primary">
                  Change password...
                </Link>
              )} */}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
