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

