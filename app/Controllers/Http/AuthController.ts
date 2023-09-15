import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async uniqRegister(ctx: HttpContextContract) {
    try {
      const validations = schema.create({
        email: schema.string({}, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({}, [rules.confirmed()]),
      })

      const data = await ctx.request.validate({ schema: validations })

      const user = await User.create(data)

      return ctx.response.created(user)
    } catch (error) {
      return ctx.response.status(500).json({ error: 'Hubo un error al registrar al usuario.' })
    }
  }

  public async auth(ctx: HttpContextContract) {
    try {
      const email = ctx.request.input('email')
      const password = ctx.request.input('password')

      const token = await ctx.auth.attempt(email, password)
      return token.toJSON()
    } catch (error) {
      return ctx.response.status(401).json({ error: 'Credenciales incorrectas.' })
    }
  }
}
