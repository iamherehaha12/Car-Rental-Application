import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const UserLoginForm = () => {
  let navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => {
        console.log("result", result);
        result.json().then((res) => {
          if (res.success) {
            toast.success(res.responseMessage, {
              position: "top-center",
              autoClose: 100,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
              window.location.href = "/home";
            }, 100); // Redirect after 3 seconds

            if (res.user.role === "Admin") {
              sessionStorage.setItem("active-admin", JSON.stringify(res.user));
              sessionStorage.setItem("admin-jwtToken", res.jwtToken);
            } else if (res.user.role === "Customer") {
              sessionStorage.setItem("active-customer", JSON.stringify(res.user));
              sessionStorage.setItem("customer-jwtToken", res.jwtToken);
            }
          } else {
            toast.error(res.responseMessage, {
              position: "top-center",
              autoClose: 100,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        });
      })
      .catch((error) => {
        console.error(error);
        toast.error("It seems server is down", {
          position: "top-center",
          autoClose: 100,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  return (
    <div>
      <div className="mt-2 d-flex aligns-items-center justify-content-center">
        <div className="form-card" style={{ width: "25rem" }}>
          <div className="container-fluid">
            <div
              className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center"
              style={{
                borderRadius: "1em",
                height: "38px",
              }}
            >
              <h4 className="card-title">User  Login</h4>
            </div>
            <div className="card-body mt-3">
              <form className="text-color" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="role" className="form-label">
                    <b>User Role</b>
                  </label>
                  <select
                    {...register("role", { required: true })}
                    className="form-control"
                  >
                    <option value="">Select Role</option>
                    <option value="Admin"> Admin </option>
                    <option value="Customer"> Customer </option>
                  </select>
                  {errors.role && <p className="text-danger">Role is required</p>}
                </div>

                <div className="mb-3">
                  <label htmlFor="emailId" className="form-label">
                    <b>Email Id</b>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailId"
                    {...register("emailId", { required: true })}
                  />
                  {errors.emailId && <p className="text-danger">Email is required</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    {...register("password", { required: true })}
                    autoComplete="on"
                  />
                  {errors.password && <p className="text-danger">Password is required</p>}
                </div>
                <div className="d-flex aligns-items-center justify-content-center mb-2">
                  <button
                    type="submit"
                    className="btn bg-color custom-bg-text"
                  >
                    <b> Login</b>
                  </button>
                  <ToastContainer />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginForm;