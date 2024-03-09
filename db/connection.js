const {Pool} =require('pg')
const {PASSWORD}=require('../constants')
const pool=new Pool({
    user: 'postgres',
  host: 'localhost',
  database: 'GetUrTechPostgreDB',
  password: 'hr',
  port: 5432,
})
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});
module.exports={
    query:(text,params)=>pool.query(text,params),
}

