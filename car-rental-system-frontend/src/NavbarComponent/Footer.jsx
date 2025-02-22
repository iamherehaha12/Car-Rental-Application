import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div class="container my-5">
        <footer class="text-center text-lg-start">
          <div class="container-fluid p-4 pb-0">
            

            <hr class="mb-4" />

            <section class="">
              <p class="d-flex justify-content-center align-items-center">
                <span class="me-3 custom-bg-text">
                  <b>Login from here</b>
                </span>
                <Link to="/user/login" class="active">
                  
                </Link>
              </p>
            </section>

            <hr class="mb-4" />
          </div>

          
        </footer>
      </div>
    </div>
  );
};

export default Footer;
