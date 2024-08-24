import { Outlet, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const cartCounter = useSelector((state) => state.cart.cartCounter); // Access cartCounter property
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-light bg-white position-fixed w-100 top-0 start-0 shadow">
        <div className="container-fluid p-0">
          <Link className="navbar-brand text-uppercase fw-800" to="#">
            <span className="border-red pe-2">IT</span>Defined
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#myNav"
            aria-controls="myNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fas fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="myNav">
            <div className="navbar-nav ms-auto">
              <Link className="nav-link active" aria-current="page" to="/">
                {" "}
                All{" "}
              </Link>
              <Link className="nav-link" to="/men">
                {" "}
                Men
              </Link>
              <Link className="nav-link" to="/women">
                {" "}
                Women
              </Link>
              <Link className="nav-link" to="/kids">
                {" "}
                Kids
              </Link>
              <Link className="nav-link" to="/accessories">
                {" "}
                Home & Living{" "}
              </Link>
              <Link className="nav-link" to="/cosmetics">
                {" "}
                Beauty{" "}
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
              <Link className="icon mt-2 px-3" to="/cart">
                <span className="fas fa-shopping-bag"></span> {cartCounter}
              </Link>
            </div>
          </div>
        </div>
        <Outlet />
      </nav>
    </>
  );
};

export default Navbar;
