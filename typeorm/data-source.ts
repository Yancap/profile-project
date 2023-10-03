import { DataSource } from 'typeorm';


const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'yan123',
  password: 'yan123',
  database: 'learnNest',
  migrations: [`${__dirname}/migrations/**/*.ts`] 
})


export default dataSource;