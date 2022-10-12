import app from './config/app'
import 'dotenv/config'

app.listen(process.env.PORT, () => {
  ('running at port ', process.env.PORT)
})