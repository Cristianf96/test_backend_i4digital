import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Car from 'App/Models/Car'

export default class CarsController {
  /**
   * @swagger
   * /api/car:
   * get:
   * post:
   *     tags:
   *       - Car
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           description: Car payload
   *           schema:
   *             type: object
   *             properties:
   *               phone:
   *                 type: string
   *                 example: 'James Bond'
   *                 required: true
   *               email:
   *                 type: string
   *                 example: 'Bond007@example.com'
   *                 required: true
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: Success
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Car'
   */
  public async index() {
    return Car.all()
  }

  public async store(ctx: HttpContextContract) {
    try {
      const carData = {
        id_customer: ctx.request.input('id_customer'),
        identification_customer: ctx.request.input('identification_customer'),
        car_model: ctx.request.input('car_model'),
        factors: ctx.request.input('factors'),
        test_drive_qualification: ctx.request.input('test_drive_qualification'),
        satisfaction_rating: ctx.request.input('satisfaction_rating'),
      }

      const newCar = await Car.create(carData)

      return ctx.response.status(200).json({ created: true, data: newCar })
    } catch (error) {
      return ctx.response.status(500).json({ error: 'Hubo un error al crear el registro.' })
    }
  }

  public async find(ctx: HttpContextContract) {
    try {
      const params = ctx.params
      const foundCar = await Car.findOrFail(params.id)

      return ctx.response.status(200).json({ find: true, data: foundCar })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return ctx.response.status(404).json({ error: 'Registro no encontrado.' })
      }
      return ctx.response.status(500).json({ error: 'Hubo un error al buscar el registro.' })
    }
  }

  public async update(ctx: HttpContextContract) {
    try {
      const params = ctx.params
      const findData = await Car.findOrFail(params.id)
      const body = ctx.request.body()

      findData.merge({
        id_customer: body.id_customer,
        identification_customer: body.identification_customer,
        car_model: body.car_model,
        factors: body.factors,
        test_drive_qualification: body.test_drive_qualification,
        satisfaction_rating: body.satisfaction_rating,
      })

      await findData.save()

      return ctx.response.status(200).json({ updated: true, data: findData })
    } catch (error) {
      return ctx.response.status(500).json({ error: 'Hubo un error al actualizar el registro.' })
    }
  }

  public async delete(ctx: HttpContextContract) {
    try {
      const params = ctx.params
      const findData = await Car.findOrFail(params.id)

      await findData.delete()

      return ctx.response.status(200).json({ deleted: true })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return ctx.response.status(404).json({ error: 'Registro no encontrado.' })
      }
      return ctx.response.status(500).json({ error: 'Hubo un error al eliminar el registro.' })
    }
  }
}
