import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (document.URL.indexOf("customer") !== -1) {
      setValue("role", "Customer");
    }
  }, [setValue]);

  const saveUser = (data) => {
    fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((res) => {
        if (res.success) {
          toast.success(res.responseMessage, { autoClose: 1000 });
          setTimeout(() => navigate("/user/login"), 1000);
        } else {
          toast.error(res.responseMessage || "Server error", { autoClose: 1000 });
        }
      })
      .catch(() => {
        toast.error("It seems the server is down", { autoClose: 1000 });
      });
  };

  return (
    <div className="mt-2 d-flex aligns-items-center justify-content-center ms-2 me-2 mb-2">
      <div className="form-card border-color text-color" style={{ width: "50rem" }}>
        <div className="container-fluid">
          <div className="card-header bg-color custom-bg-text mt-2 d-flex justify-content-center align-items-center" style={{ borderRadius: "1em", height: "45px" }}>
            <h5 className="card-title">Register Here!!!</h5>
          </div>
          <div className="card-body mt-3">
            <form className="row g-3" onSubmit={handleSubmit(saveUser)}>
              <div className="col-md-6 mb-3 text-color">
                <label className="form-label"><b>First Name</b></label>
                <input type="text" className="form-control" {...register("firstName", { required: "First Name is required" })} />
                {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label className="form-label"><b>Last Name</b></label>
                <input type="text" className="form-control" {...register("lastName", { required: "Last Name is required" })} />
                {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
              </div>

              <div className="col-md-6 mb-3 text-color">
                <label className="form-label"><b>Email Id</b></label>
                <input type="email" className="form-control" {...register("emailId", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" } })} />
                {errors.emailId && <p className="text-danger">{errors.emailId.message}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Password</b></label>
                <input type="password" className="form-control" {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })} />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Contact No</b></label>
                <input type="number" className="form-control" {...register("phoneNo", { required: "Contact No is required" })} />
                {errors.phoneNo && <p className="text-danger">{errors.phoneNo.message}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Street</b></label>
                <textarea className="form-control" {...register("street", { required: "Street is required" })} rows="3"></textarea>
                {errors.street && <p className="text-danger">{errors.street.message}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>City</b></label>
                <input type="text" className="form-control" {...register("city", { required: "City is required" })} />
                {errors.city && <p className="text-danger">{errors.city.message}</p>}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label"><b>Pincode</b></label>
                <input type="number" className="form-control" {...register("pincode", { required: "Pincode is required" })} />
                {errors.pincode && <p className="text-danger">{errors.pincode.message}</p>}
              </div>

              <div className="d-flex aligns-items-center justify-content-center">
                <input type="submit" className="btn bg-color custom-bg-text" value="Register User" />
              </div>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;