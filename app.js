//const startupDebugger = require('debug')('app:startup') //random namespace
const debug = require('debug')('app:startup') //random namespace
const express = require('express')
const app = express()

const users = require('./routes/users')
const newsletter = require('./routes/newsletter')


app.use(express.json())
// app.use(express.urlencoded())
// app.use(express.static('public'))

// any route that starts with /api/users use router 'users'
app.use('/api/users', users)
app.use('/api/newsletter', newsletter)



// if(app.get('env') === 'development'){ 
//     app.use(morgan('tiny'))
//     // export DEBUG=app:startup
//     // turn off DEBUG=
//     // to set debug and start server/app
//     // $DEBUG=app:starup nodemon app.js
//     debug('Morgan enabled...') 
// }



const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
})
