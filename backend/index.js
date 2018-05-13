require('dotenv').config();
const server = require('./server')

const port = process.env.PORT || 2000
server.listen(port, () => console.log(`API server started on ${port}`))
