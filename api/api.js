const connection = require('mongowave')
const Sirloin = require('sirloin')

let db
async function connect () {
  db = await connection({ url: 'mongodb://localhost:27017', name: 'mongowave' })
}
connect()

// Default config shown
const app = new Sirloin({
  // Web server port
  port: 3001
})

// Middleware functions are run in the order that they are added
app.use(async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
})

app.get('/v1/friends', async (req, res) => {
  const result = await db('friend').create({
    name: 'Susana Pham',
    email: 's.susana.pham@gmail.com',
    phone: '40295090'
  })
  const all = await db('friend').find()
  return all
  // Return nothing or undefined to send a 404
})


app.post('/signup', async (req, res) => {
  // Validate data
  const {name, email, password, repeat} = req.params

  const errors = {}
  if (name.length < 2) {
    errors.name = "Name must be more than 2 characters"
  }
  if(password.length < 4) {
    errors.password ="Password length must contain at least 4 characters"
  }

  if(repeat !== password) {
    errors.password ="Password length must contain at least 4 characters"
  }
  const hasErrors = Object.keys(errors).length > 0
  if(hasErrors) {
    return {errors}
  }
  // Save in DB
  const result = await db('user').create(req.params)
  // Return result
  return result
})

app.post('/login', async (req, res) => {
  // Validate data
  const {email, password} = req.params
  const errors = {}
  // Return error if not validate
  const user = await db('user').get({email, password })
  // Check if user exist in db
  if (user === null) {
    errors.user = "User does not exist"
    return { errors }
  }
  return {_id: user._id}
})

app.post('/settings/email', async (req, res) => {
  // Get id from cookie
  const _id = req.cookie('user')

  // Get user from db
  const user = await db('user').get({_id})
  if(!user) {
    return { errors: "User not found" }
  }

  const {email} = req.params

  // validate email
  if(!email || email.length < 4) {
    return { errors: "Email is not valid" }
  }
  await db('user').update({_id}, {email})
  console.log({_id})
  return {}

})

  app.post('/settings/password', async (req, res) => {
  // Get id from cookie
  const _id = req.cookie('user')

  // Check user
  const user = await db('user').get({_id})
  if(!user) {
    return { errors: "User not found" }
  }
  // Get parameters Validate parameters
  const {current, password, repeat} = req.params

  // 1. Check that old password is correct or error
  const userWithPassword = await db('user').get( {_id, password})
  if(!userWithPassword) {
    return { errors: "Current password is incorrect"}
  }
  // 2. Check that password is more than 4 or error
  if(password.length < 4) {
    return { errors: "Password is too short"}
  }
  // 3. Check that password and repeat are equal or error
  if(repeat !== password) {
    return { errors: "Password is not valid" }
  }
  // Update password in db and return empty object
  await db('user').update({_id}, {password})
  return {}

})
