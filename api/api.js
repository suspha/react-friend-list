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
  res.setHeader('Access-Control-Allow-Origin', '*')
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
  console.log(req.params)
  const {email, password} = req.params
  const errors = {}
  // Return error if not validate
  const user = await db('user').get({email, password })
  console.log(user)
  // Check if user exist in db
  if (user === null) {
    errors.user = "User does not exist"
    return { errors }
  }
  return {_id: user._id}
})