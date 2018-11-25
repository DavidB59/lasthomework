// src/pages/controller.ts
import { JsonController, Body, Get, Param, Put, Post, HttpCode, NotFoundError } from 'routing-controllers'
import Game from './entity'

@JsonController()
export default class GameController {

  @Get('/games')
  allGames() {
    return Game.find()
  }
  //@ValidateIf(a => colors.includes(a.color) )
  @Put('/games/:id')
  // @IsIn([ 'red','blue','yellow','magenta'])
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial <Game>,
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    // if(game.color)
    return Game.merge(game, update).save()
  } // FORBID DO CHANGE ID ?

  @Post('/games')
  @HttpCode(201)
  createGame(
    @Body() game: Game
    // @Body({validate:false}) game: Game // Partial <Game>   // should be only name
  ) { 
    // if (game.color !== undefined) { return 'color is automatically generated'}
    const colors = [ 'red','blue','yellow','magenta']

    game.color = colors[Math.floor(Math.random()*colors.length)]
    return game.save() }
}

