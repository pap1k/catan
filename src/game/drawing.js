const constant = require("./const.json")
class Drawing {
  constructor(context) {
    this.context = context
  }
  drawHexagon(X, Y, number, red = false) {
    if (red) {
      this.context.lineWidth = 2
      this.context.strokeStyle = "rgb(204, 31, 31)"
    }
    this.drawHexagonAt(X, Y)
    if (number != 0) {
      this.context.font = "48px serif"
      this.context.fillText(number, X, Y)
    }
    this.context.strokeStyle = "rgb(0,0,0)"
    this.context.lineWidth = 1
  }

  drawHexagonAt(x, y, size = constant.FIELD.HEX_SIZE) {
    const a = (2 * Math.PI) / 6
    const deg = (90 * Math.PI) / 180
    this.context.beginPath()
    for (let i = 0; i < 6; i++) {
      this.context.lineTo(
        x + size * Math.cos(a * i + deg),
        y + size * Math.sin(a * i + deg)
      )
    }
    this.context.closePath()
    this.context.stroke()
  }
  drawHexImage(x, y, image, side = "lt") {
    const sz = 50
    switch (side) {
      case "lt":
        return this.context.drawImage(image, x - sz, y - sz, sz, sz)
      case "lb":
        return this.context.drawImage(image, x - sz, y, sz, sz)
      case "rt":
        return this.context.drawImage(image, x, y, sz, sz)
      case "rb":
        return this.context.drawImage(image, x, y - sz, sz, sz)
    }
  }
  drawHexRoad(x, y, image, side) {
    const sz_h = 10,
      sz_w = 10
    switch (side) {
      case "l":
        return null
      case "lt":
        return null
      case "rt":
        return null
      case "r":
        return null
      case "lb":
        return null
      case "rb":
        return null
    }
  }
  clear() {
    this.context.clearRect(0, 0, constant.SIZE.WIDTH, constant.SIZE.HEIGHT)
  }
}

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

exports.canvas = canvas
exports.ctx = ctx
exports.Drawer = new Drawing(ctx)
