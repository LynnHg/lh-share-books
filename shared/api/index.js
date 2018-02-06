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

function shareAddBook(params, successCb, errorCb, completeCb) {
  createAPI.post(URL.request.shareAddBook, params, successCb, errorCb, completeCb);
}

function getBookByIsbn(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getBookByIsbn, params, successCb, errorCb, completeCb);
}

function manualAddBook(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.manualAddBook, params, successCb, errorCb, completeCb);
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

function changeDeposit(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.changeDeposit, params, successCb, errorCb, completeCb);
}

function changeMoney(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.changeMoney, params, successCb, errorCb, completeCb);
}

// pay 
function pay(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.pay, params, successCb, errorCb, completeCb);
}

// feedback 
function userAddFeedback(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.userAddFeedback, params, successCb, errorCb, completeCb);
}

// circle 
function getAllCircle(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getAllCircle, params, successCb, errorCb, completeCb);
}

// activity 
function getAllAct(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getAllAct, params, successCb, errorCb, completeCb);
}

function addAct(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.addAct, params, successCb, errorCb, completeCb);
}

// lovingbook
function addLovingbook(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.addLovingbook, params, successCb, errorCb, completeCb);
}

function removeLovingbook(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.removeLovingbook, params, successCb, errorCb, completeCb);
}

function getLovingbook(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getLovingbook, params, successCb, errorCb, completeCb);
}

function getAllLovingbook(params, successCb, errorCb, completeCb) {
  createAPI.get(URL.request.getAllLovingbook, params, successCb, errorCb, completeCb);
}

export default {
  getAllBook,
  getBookById,
  getBookByName,
  getBookByStoreid,
  getBookByOpenid,
  shareAddBook,
  getBookByIsbn,
  returnBook,
  manualAddBook,
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
  changeDeposit,
  changeMoney,
  pay,
  userAddFeedback,
  getAllCircle,
  getAllAct,
  addAct,
  addLovingbook,
  removeLovingbook,
  getLovingbook,
  getAllLovingbook
}