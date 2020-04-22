const initialState = {
    products:[
        {
            id:"", 
            name: "product 01", 
            imgurl:"",
            description: "lucu lucu cantik cantik", 
            price:49000, 
            category:"nylon headband", 
            stock: 1, 
            colors:["ff00ff"]
        }
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