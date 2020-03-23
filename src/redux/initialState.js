const initialState = {
    products:[
        {name: "product 01", color:[], price: 45000}
    ],

    colors: [],

    categories: ["flower bouquet",
                "nylon headband", 
                "lace headband", 
                "flower crown", 
                "animal ears"],

    imgThumbDisplay: require('../images/mf-icon.png'),

    user: {
        id:"",
        username:"",
        email:"",
        token:"",
        isLoggedIn: false
    }
}

export default initialState;