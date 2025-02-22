import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminHeader = () => {
  let navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("active-admin"));
  console.log(user);

  const adminLogout = () => {
    toast.success("logged out!!!", {
      position: "top-center",
      autoClose: 100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    sessionStorage.removeItem("active-admin");
    sessionStorage.removeItem("admin-jwtToken");
    window.location.reload(true);
    setTimeout(() => {
      navigate("/home");
    }, 100); // Redirect after 3 seconds
  };
  return (
    <ul class="navbar-nav ms-auto mb-2 mb-lg-0 me-5">
      <li class="nav-item">
        <Link
          to="/user/admin/register"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Register Admin</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/admin/company/add"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Add Company</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/admin/variant/add"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color">Add Car Variant</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/admin/variant/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color"> Car Variants</b>
        </Link>
      </li>

      <li class="nav-item">
        <Link
          to="/admin/customer/bookings"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color"> Bookings Details</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to="/admin/customer/all"
          class="nav-link active"
          aria-current="page"
        >
          <b className="text-color"> Customers</b>
        </Link>
      </li>
      <li class="nav-item">
        <Link
          to=""
          class="nav-link active"
          aria-current="page"
          onClick={adminLogout}
        >
          <b className="text-color">Logout</b>
        </Link>
        <ToastContainer />
      </li>
    </ul>
  );
};

export default AdminHeader;
