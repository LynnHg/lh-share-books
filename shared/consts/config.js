const URL = {
  request: {
    // book
    getAllBook: 'book/allbook',
    getBookById: 'book/getBookById',
    getBookByName: 'book/searchByName',
    getBookByStoreid: 'book/searchBookByStoreid',
    getBookByOpenid: 'book/searchBookByOpenid',
    returnBook: 'returnBook',
    shareAddBook: 'book/shareAdd',
    manualAddBook: 'book/manualAddBook',
    getBookByIsbn: 'searchByIsbn',

    // store
    getAllStore: 'store/allstorelist',
    getStoreById: 'store/searchById',

    // order
    getOrderByOrderid: 'order/getorderbyorderid',
    getOrderByOpenid: 'order/getorderbyopenid',
    addOrder: 'order/add',
    deleteOrder: 'order/deleteorder',
    
    // user
    getAllUser: 'user/alluser',
    getUserByOpenid: 'user/searchByOpenid',
    addUser: 'user/add',
    saveUserInfo: 'user/saveinfo',
    changeDeposit: 'user/changeDeposit',
    changeMoney:'user/changeMoney',

    // pay 
    pay: 'pay',

    // feedBack
    userAddFeedback: 'feedback/userAdd',

    // circle 
    getAllCircle: 'circle/allcircle',
  }
}

export default URL;