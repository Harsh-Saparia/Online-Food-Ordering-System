const Menu = require('../../models/menu')

function homeController() {

    return{
        async index(req,res) {
            const menus = await Menu.find()
            // console.log(menus)
            return res.render('home',{menus:menus})
            // Menu.find().then(function(menus){
            //     console.log(menus)
            //     res.render('home',{menus:menus})
            // })
            
        }
    }
}


module.exports = homeController