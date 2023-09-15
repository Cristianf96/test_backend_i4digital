import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_customer: string

  @column()
  public identification_customer: number

  @column()
  public car_model: number

  @column()
  public factors: string

  @column()
  public test_drive_qualification: number

  @column()
  public satisfaction_rating: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
