const constant = require("./const.json")
import { Bandit, City } from "./objects"

class HexSide {
  constructor() {}
}
class HexCorner {
  constructor() {}
}
class Hex {
  constructor(index, number) {
    const { Drawer } = require("./drawing")
    this.drawer = Drawer

    this.sides = [new HexSide() * 6]
    this.corners = [new HexCorner() * 6]
    this.number = number
    this.index = index
    this.biome = constant.BIOMES.Desert

    this.hasBandit = false
    this.Bandit = null

    this.hasCity = false
    this.City = null

    this.PosY = this._PosY
    this.PosX = this._PosX
  }
  get _PosY() {
    return constant.FIELD.POS_Y + constant.FIELD.HEX_SIZE * 2 * this.Row
  }

  get _PosX() {
    const iseven = constant.FIELD_MODEL[this.Row] % 2 === 1
    let offset = 0
    if (iseven) {
      offset = Math.floor(constant.FIELD_MODEL[this.Row] / 2) - 1
    }
    return (
      constant.FIELD.POS_X +
      constant.FIELD.HEX_SIZE * 2 * this.Col -
      (iseven ? 0 : constant.FIELD.HEX_SIZE) -
      offset * constant.FIELD.HEX_SIZE * 2
    )
  }
  get Row() {
    let c = 0
    for (let i = 0; i < constant.FIELD_MODEL.length; i++) {
      c += constant.FIELD_MODEL[i]
      if (this.index < c) return i
    }
    return 100
  }
  get Col() {
    const r = this.Row
    if (r == 0) return this.index
    let sum = 0
    for (let i = 0; i < r; i++) sum += constant.FIELD_MODEL[i]
    return this.index - sum
  }
  get HasBandit() {
    return this.hasBandit
  }
  set HasBandit(v) {
    if (v) this.Bandit = new Bandit()
    else this.Bandit = null
    return (this.hasBandit = v)
  }
  get HasCity() {
    return this.hasCity
  }
  set HasCity(v) {
    if (v) this.City = new City()
    else this.City = null
    return (this.hasCity = v)
  }
  draw(selected = false) {
    this.drawer.drawHexagon(this.PosX, this.PosY, this.number, selected)
    if (this.HasBandit) {
      if (this.Bandit.Art)
        this.drawer.drawHexImage(this.PosX, this.PosY, this.Bandit.Art, "lt")
      else alert("Ошибка загрузки спрайта, попробуйте перезагрузить страницу")
    }
    if (this.HasCity) {
      if (this.City.Art)
        this.drawer.drawHexImage(this.PosX, this.PosY, this.City.Art, "lb")
      else alert("Ошибка загрузки спрайта, попробуйте перезагрузить страницу")
    }
  }
}

exports.GameField = class {
  constructor(drawer) {
    this.drawer = drawer
    this.state = "BUILDING"
    this.field = []
    //this.drawer.test()
  }
  create() {
    //....
    let numbers = [0, 2, 3, 3, 4, 4, 5, 5, 6, 6, 8, 8, 9, 9, 10, 10, 11, 11, 12]
    shuffleArray(numbers)
    for (let i = 0; i < 19; i++) {
      this.field[i] = new Hex(i, numbers[i])
    }
    this.draw()
  }
  draw(selected = -1) {
    this.state = "DRAWING"
    this.drawer.clear()
    this.drawer.drawHexagonAt(
      constant.FIELD.POS_X + 140,
      constant.FIELD.POS_Y + 280,
      450
    )
    this.field.forEach((v, i) => v.draw(i == selected))
    this.state = "READY"
  }
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}
