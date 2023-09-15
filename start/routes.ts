/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'Cars API' }
})

Route.group(() => {
  Route.get('/car', 'CarsController.index')
  Route.post('/car/create', 'CarsController.store')
  Route.get('/car/:id', 'CarsController.find')
  Route.put('/car/:id', 'CarsController.update')
  Route.delete('/car/:id', 'CarsController.delete')
}).prefix('api')
