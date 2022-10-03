import app from './config/app'
import 'dotenv/config'

app.listen(process.env.PORT, () => {
  console.log('running at port ', process.env.PORT)
})