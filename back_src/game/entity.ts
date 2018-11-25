import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsIn, Length } from 'class-validator'

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Length(5,25)
  @Column('text')
  name: string

  @IsIn([ 'red','blue','yellow','magenta'])
  @IsString()
  @Column({type:'text',nullable:true})
  color: string

  @Column({type:'json',nullable:true})
  board: 'json'  // TO BE REPLACED
}