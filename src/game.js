const { GameField } = require("./game/gamefield")
const { canvas, Drawer } = require("./game/drawing")
const { Player, mousedown, mousemove } = require("./game/player")

const player = new Player()
const gamefield = new GameField(Drawer)

canvas.onmousedown = mousedown(player, gamefield)
canvas.onmousemove = mousemove(player, gamefield)

gamefield.create()
