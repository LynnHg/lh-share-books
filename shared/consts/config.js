const URL = {
  request: {
    // book
    getAllBook: 'book/allbook',
    getBookById: 'book/getBookById',

    // store
    getAllStore: 'store/allstorelist',
    getStoreById: 'store/searchById',

    // order
    getOrderByOpenid: 'order/getorderbyopenid',
    addOrder: 'order/add',
    deleteOrder: 'order/deleteorder',
    
    // user
    getAllUser: 'user/alluser',
    getUserByOpenid: 'user/searchByOpenid',

    //pay 
    pay: 'pay'
  }
}

export default URL;