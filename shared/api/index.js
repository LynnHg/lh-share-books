import createAPI from '../utils/createAPI';
import URL from '../consts/config';

// book
function getAllBook(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getAllBook, params, successCb, errorCb, completeCb);
}

function getBookById(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getBookById, params, successCb, errorCb, completeCb);
}

function getBookByName(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getBookByName, params, successCb, errorCb, completeCb);
}

function getBookByStoreid(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getBookByStoreid, params, successCb, errorCb, completeCb);
}

function getBookByOpenid(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getBookByOpenid, params, successCb, errorCb, completeCb);
}

function returnBook(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.returnBook, params, successCb, errorCb, completeCb);
}

// store
function getAllStore(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getAllStore, params, successCb, errorCb, completeCb);
}

function getStoreById(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getStoreById, params, successCb, errorCb, completeCb);
}

// order
function getOrderByOpenid(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getOrderByOpenid, params, successCb, errorCb, completeCb);
}

function getOrderByOrderid(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getOrderByOrderid, params, successCb, errorCb, completeCb);
}

function addOrder(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.addOrder, params, successCb, errorCb, completeCb);
}

function deleteOrder(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.deleteOrder, params, successCb, errorCb, completeCb);
}

// user
function getAllUser(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getAllUser, params, successCb, errorCb, completeCb);
}

function getUserByOpenid(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getUserByOpenid, params, successCb, errorCb, completeCb);
}

function addUser(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.addUser, params, successCb, errorCb, completeCb);
}

function saveUserInfo(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.saveUserInfo, params, successCb, errorCb, completeCb);
}

// pay 
function pay(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.pay, params, successCb, errorCb, completeCb);
}

export default {
  getAllBook,
  getBookById,
  getBookByName,
  getBookByStoreid,
  getBookByOpenid,
  returnBook,
  getAllStore,
  getStoreById,
  getOrderByOrderid,
  getOrderByOpenid,
  addOrder,
  deleteOrder,
  getAllUser,
  getUserByOpenid,
  addUser,
  saveUserInfo,
  pay,
}