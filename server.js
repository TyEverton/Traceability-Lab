const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')



const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'de9ec934266f4a9881098fe227981b8d',
  captureUncaught: true,
  captureUnhandledRejections: true
})

app.use(express.json())

app.use(cors())

app.use("/styles.css", express.static(path.join(__dirname, '/public/styles.css')))

app.get("/api/compliment", function (req, res) {
  const compliments = ["Nice shirt!", "Dang, you cook real good!", "Sweet shoes!"]

  let randomIndex = Math.floor(Math.random() * compliments.length)
  let randomCompliment = compliments[randomIndex]

  res.status(200).send(randomCompliment)
})

app.get('/', function(req, res) {
  rollbar.log('Hello, I am Rolllbar!')
 
  try{ 
    fakeFunction() 
  } catch (err){
    console.log(err)
    rollbar.error(err)
    rollbar.critical('freaking error here')
    rollbar.warning('heres your freaking warning bud')
  }
  res.sendFile(path.join(__dirname, '/public/index.html'))

})





const port = process.env.PORT || 4545

app.use(rollbar.errorHandler('Error is here'))

app.listen(port, function() {
  console.log(`Server is blaring the bumps on ${port}`)
})