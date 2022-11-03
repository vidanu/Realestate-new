import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
//i18n
import { withTranslation } from "react-i18next";
// Redux
import { connect } from "react-redux";
import { withRouter, Link, useHistory, NavLink } from "react-router-dom";
// users
import user1 from "assets/images/avatar-defult.jpg";
import { useUser } from "RealEstateCbe/contextProviders/userProvider";
import { RElogoutUser } from "RealEstateCbe/helpers/REbackend_helper";
const REProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const histroy = useHistory();
  const { currentUser, setCurrentUser } = useUser();
  const [menu, setMenu] = useState(false);
  const handleLogout = async () => {
    const res = await RElogoutUser();
    if (res.success) {
      localStorage.removeItem("authUser");
      setCurrentUser("");
      histroy.push("/");
    } else {
      console.log("Logout failed");
    }
  };
  return (
    <React.Fragment>
      {currentUser ? (
        <Dropdown
          isOpen={menu}
          toggle={() => setMenu(!menu)}
          className="d-inline-block"
        >
          <button
            to="#"
            className="dropdown-item"
            onClick={() => {
              handleLogout();
            }}
          >
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger" />
            <span>{props.t("Logout")}</span>
          </button>
          {/* </Link> */}
          {/* </DropdownMenu> */}
        </Dropdown>
      ) : (
        <Link to="/RElogin" className="dropdown">
          <i className="bx font-size-20 align-middle me-1 text-primary" />
          <span>{props.t("Login/Register")}</span>
        </Link>
      )}
    </React.Fragment>
  );
};
REProfileMenu.propTypes = {
  success: PropTypes.any,
  t: PropTypes.any,
};
const mapStatetoProps = (state) => {
  const { error, success } = state.Profile;
  return { error, success };
};
export default withRouter(
  connect(mapStatetoProps, {})(withTranslation()(REProfileMenu))
);
