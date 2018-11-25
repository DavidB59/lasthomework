import { JsonController, Body, Get, Param, Put, Post, HttpCode, NotFoundError, BadRequestError } from 'routing-controllers'
import Game from './entity'
const colors = ['red', 'blue', 'yellow', 'magenta']

const moves = (board1, board2) =>
  board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
    .length

@JsonController()
export default class GameController {

  @Get('/games')
  allGames() {
    return Game.find()
  }

  @Put('/games/:id')
  async updateGame(
    @Param('id') id: number,
    @Body() update: Partial<Game>,
  ) {
    const game = await Game.findOne(id)
    if (!game) throw new NotFoundError('Cannot find game')
    if (update.id !== undefined) { throw new BadRequestError('id cannot be updated') }
    if (update.color !== undefined) {
      if (!colors.includes(update.color)) {
        throw new BadRequestError(`colors must have one those values ${colors}`)
      }
    }
    if (update.board !== undefined) {
      if (moves(game.board, update.board) > 1) {
        throw new BadRequestError(` no more than one move per turn`)
      }
    }

    return Game.merge(game, update).save()
  }

  @Post('/games')
  @HttpCode(201)
  createGame(
    @Body({ validate: false }) game: Game 
  ) {
    game.color = colors[Math.floor(Math.random() * colors.length)]
    game.board = [['o', 'o', 'o'], ['o', 'o', 'o'], ['o', 'o', 'o']]
    return game.save()
  }
}

