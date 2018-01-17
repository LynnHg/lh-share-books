var api = require('./config.js');
//网络请求模块
function request(url, data, successCb, errorCb, completeCb) {
    wx.request({
        url: url,
        method: 'POST',
        data: data,
        header: {
          "Content-Type": "json"
        },
        success: successCb,
        error: errorCb,
        complete: completeCb
    });
    console.log(url,data)
}

//搜索图书 
function searchBook(data, successCb, errorCb, completeCb) {
  request('https://www.eton100.com/book/SearchBook', data, successCb, errorCb, completeCb);
}
//获取图书详细信息
function getBookById(data, successCb, errorCb, completeCb) {
  request('https://www.eton100.com/book/SearchBookByBookid', data, successCb, errorCb, completeCb);
}
//获取丛书列表
function getBookList(data, successCb, errorCb, completeCb) {
  request('https://www.eton100.com/book/SearchBook', data, successCb, errorCb, completeCb);
}

//
module.exports = { searchBook: searchBook, getBookById: getBookById, getBookList:getBookList}