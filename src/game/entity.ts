import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, IsIn  } from 'class-validator'


type board = string[][]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @Column('text')
  name: string

  @IsIn([ 'red','blue','yellow','magenta'])
  @IsString()
  @Column( {type :'text' , nullable:true })
  color: string

  @Column({type:'json',nullable:true})
  board: board  

}