import { del, get, post, put } from "../helpers/REapi_helper";
import { SERVER_URL } from "../helpers/REConfiguration";
const BASE_URL = `${SERVER_URL}/api`;

const REuserRegisteration = (payload) =>
  post(`${BASE_URL}/user/register`, payload);
const REuserLogin = (payload) => post(`${BASE_URL}/user/login`, payload);
const ReuserUpdate = (payload) => put(`${BASE_URL}/user/edit`, payload);
const RepropertyUpdate = (payload) =>
  put(`${BASE_URL}/property/propertyedit`, payload);
const RElogoutUser = () => get(`${BASE_URL}/user/logout`);
const REpropertyRegistration = (payload) =>
  post(`${BASE_URL}/property/Sellproperty`, payload);

const getAllProperty = (payload) =>
  post(`${BASE_URL}/property/properties`, payload);
const getPropertyById = (payload) =>
  post(`${BASE_URL}/user/propertydetails`, payload);
const getFileFromGFS = ({ id }) => get(`${SERVER_URL}/file/${id}`);
const getPropertyPicUpload = (payload) =>
  post(`${BASE_URL}/property/propertyPicUpload`, payload);
const getPropertybyUserId = (payload) =>
  post(`${BASE_URL}/property/getpropertyByUserId`, payload);

const getPropertyCount = (payload) =>
  post(`${BASE_URL}/user/propertyCount`, payload);

const REpropertyPicUpdate = (payload) =>
  put(`${BASE_URL}/user/profilePicUpdate`, payload);
//   const REpropertyPicUpdate = payload =>
//   put(`${BASE_URL}/property/propertyPicUpload`, payload)

// const REpropertyPicUpdate = payload =>
// put(`${BASE_URL}/property/getpropertypic`, payload)

//Admin
const adminLogin = (payload) => post(`${BASE_URL}/admin/adminLogin`, payload);
const allUsersList = () => get(`${BASE_URL}/admin/allUsersList`);
const getUserById = (payload) => post(`${BASE_URL}/admin/getUserById`, payload);
const removeUser = (payload) => put(`${BASE_URL}/admin/removeUser`, payload);
const allPropertiesList = () => get(`${BASE_URL}/admin/allPropertiesList`);
export {
  REpropertyPicUpdate,
  REuserRegisteration,
  REuserLogin,
  ReuserUpdate,
  RElogoutUser,
  getAllProperty,
  getPropertyCount,
  REpropertyRegistration,
  getPropertyById,
  getFileFromGFS,
  getPropertyPicUpload,
  getPropertybyUserId,
  RepropertyUpdate,
  adminLogin,
  allUsersList,
  getUserById,
  removeUser,
  allPropertiesList,
  // REpropertyPicUpdate
};
