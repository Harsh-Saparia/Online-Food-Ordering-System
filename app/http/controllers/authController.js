const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController() {

    return{
        login(req,res) {
            res.render('auth/login')
        },
        postLogin(req, res, next){
            const { email, password } = req.body
            //validation 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) =>{
                if(err){
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user)
                {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, () =>{
                    if(err){
                        req.flash('error', info.message )
                        return next(err)
                    }
                    return res.redirect('/')
                })
            })(req, res, next)
        },
        register(req,res) {
            res.render('auth/register')
        },
        async postRegister(req,res) {
            const { fname, lname, email, password } = req.body
            //validation 
            if(!fname || !lname || !email || !password) {
                req.flash('error', 'All fields are required')
                req.flash('fname',fname)
                req.flash('lname',lname)
                req.flash('email',email)
                return res.redirect('/register')
            }
            //check if email exists
            User.exists({email : email}, (err, result) => {
                if(result)
                {
                    req.flash('error', 'Email already taken')
                    req.flash('fname',fname)
                    req.flash('lname',lname)
                    req.flash('email',email)
                    return res.redirect('/register')
                }
            })

            //Hash Password
            const hashedPassword = await bcrypt.hash(password, 10)

            //Cteate a user
            const user = new User({
                fname,
                lname,
                email,
                password : hashedPassword
            })

            user.save().then((user) => {
                //Login
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            })

            // console.log(req.body)
        },
        logout(req, res){
            req.logout()
            return res.redirect('login')
        }
    }
}


module.exports = authController