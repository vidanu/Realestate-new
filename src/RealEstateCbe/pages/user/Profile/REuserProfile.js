
import MetaTags from "react-meta-tags"
import React, { useState, useEffect } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  FormGroup,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap"

// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

import { withRouter } from "react-router-dom"

import avatar from "assets/images/avatar-defult.jpg"
import { useUser } from "RealEstateCbe/contextProviders/userProvider"

import {
  REpropertyPicUpdate,
  REpropertyRegistration,
  ReuserUpdate,
} from "RealEstateCbe/helpers/REbackend_helper"
import { calenderDefaultCategories } from "common/data"

const REUserProfile = props => {
  // console.log("upload",props)

  const user = localStorage.getItem("authUser")
  const [updateSuccess, setUpdateSuccess] = useState("")
  const [updateError, setUpdateError] = useState("")
  const [loading, setLoading] = useState(false)
  const [proloading, setProLoading] = useState(false)
  const { currentUser, setCurrentUser } = useUser(user)
  const [profileUpdateSuccess, setProfileUpateSuccess] = useState("")
  const [profileUpdateError, setProfileUpateError] = useState("")
  const [allFiles, setAllFiles] = useState([])

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      firstname: currentUser?.firstname,
      lastname: currentUser?.lastname,
    },
    validationSchema: Yup.object({
      firstname: Yup.string().required("Please Enter Your First Name"),
      lastname: Yup.string().required("Please Enter Your Last Name"),
    }),
    onSubmit: async (values, onSubmitProps) => {
      setLoading(true)
      const res = await ReuserUpdate({ ...values, email: currentUser?.email })
      if (res.success) {
        setUpdateError("")
        localStorage.setItem("authUser", JSON.stringify(res))
        setCurrentUser(res)
        setUpdateSuccess("User Details updated Successfully")
        // onSubmitProps.resetForm()
      } else {
        setUpdateSuccess("")
        setCurrentUser(res)
        setUpdateError("Failed to update user details!!")
      }
      setLoading(false)
    },
  })

  const propertyPicUpload = async e => {
    setProLoading(true)
    const file = e.target.files[0]
    const res = await convertBase64(file)
    const updateRes = await REpropertyPicUpdate ({
      propertyPic: res,
      email: currentUser?.email,
    })

    if (updateRes.success) {
      setProfileUpateError("")
      localStorage.setItem("authUser", JSON.stringify(updateRes))
      setCurrentUser(updateRes)
      setProfileUpateSuccess("Property Image updated Successfully")
    } else {
      setProfileUpateSuccess("")

      setProfileUpateError("Failed to update !!")
    }

    setProLoading(false)
  }

  const convertBase64 = file => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result)
      }
      fileReader.onerror = error => {
        reject(error)
      }
    })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Profile | Coimbatore RealEstate</title>
        </MetaTags>
        <Container fluid>
          <Row>
            <Col lg="12">
              {updateError && <Alert color="danger">{updateError}</Alert>}
              {updateSuccess && <Alert color="success">{updateSuccess}</Alert>}
              {profileUpdateError && (
                <Alert color="danger">{profileUpdateError}</Alert>
              )}
              {profileUpdateSuccess && (
                <Alert color="success">{profileUpdateSuccess}</Alert>
              )}

              <Card>
                <CardBody>
                  <div className="d-flex">
                    <div className="ms-3">
                      <div className="form-group">
                        <Label className="font-size-18">
                          Select Property Images
                        </Label>

                        <div>
                          <Input
                            type="file"
                            name="file"
                            multiple={true}
                            id="hidden-file"
                            className="d-none"
                            accept=".png, .jpg, .jpeg,.pdf"
                            onChange={e => {
                              propertyPicUpload(e)
                            }}
                          />

                          <Label htmlFor="hidden-file" style={{ margin: 0 }}>
                            {proloading ? (
                              <div>
                                <i className="bx bx-loader bx-spin font-size-24 align-middle me-2"></i>
                              </div>
                            ) : (
                              <i
                                className="mdi mdi-file-image-outline  "
                                style={{
                                  color: "#556EE6",
                                  fontSize: 60,
                                }}
                              />
                            )}
                          </Label>
                        </div>
                        {Array.from(allFiles)?.length > 0 && (
                          <div className="d-flex gap-2 flex-wrap mt-2 ">
                            {Array.from(allFiles)?.map((att, a) => (
                              <span
                                className="badge badge-soft-primary font-size-13"
                                key={a}
                              >
                                {att.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* <h4 className="card-title mb-4">Owner Details</h4> */}

          {/* <Card>
            <CardBody>
              <div className="flex-grow-1 align-self-end ms-3">
                <div className="text-muted">
                  <h5>
                    Owner : {currentUser.firstname + " " + currentUser.lastname}
                  </h5>
                  <p className="mb-1"> Email :{currentUser.email}</p>
                </div>
              </div>
            </CardBody>
          </Card> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default withRouter(REUserProfile)