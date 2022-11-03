import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Col } from "reactstrap";
import { propImages } from "../../../helpers/mockData";

const RELandingCard = (props) => {
  const imgIndex = Math.floor(Math.random() * 5);
  const { user } = props;
  console.log(user);
  return (
    <React.Fragment>
      <Col xl="3" sm="6">
        <Card className="text-center">
          <Link to={`/REprojectoverview?uid=${user._id}`}>
            <CardBody>
              <div>
                <div>
                  <img
                    className="avatar-xl"
                    src={user?.propertyPic[0]}
                    alt="No Images"
                  />
                </div>
                <div className="container mt-5 mt-3">
                  <h5 className="font-size-14 text-body text-dark">
                    {user?.Housetype}
                  </h5>
                </div>
                <p className="font-size-14 text-body ">{user?.Price}</p>
                <p className="font-size-14 text-body ">{user?.Area}</p>
                <p className="font-size-14 text-body">{user?.Landmark}</p>
                <p className="font-size-14 text-body">{user?.City}</p>
                {/* <p className="text-body font-size-18">{user?.Seller}</p> */}
              </div>
            </CardBody>
          </Link>
        </Card>
      </Col>
    </React.Fragment>
  );
};

RELandingCard.propTypes = {
  user: PropTypes.object,
};

export default RELandingCard;
