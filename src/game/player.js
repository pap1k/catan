const constant = require("./const.json")

exports.Player = class {
  constructor() {
    this.selected = -1
    this.selected_prev = -1

    this.resources = {
      1: 0,
      2: 0,
      4: 0,
      5: 0,
      6: 0,
    }
    this.goods = {
      1: 0,
      3: 0,
      4: 0,
    }

    this.points = 0
  }
  getResource(type) {
    return this.resources[type]
  }
  getGood(type) {
    return this.good[type]
  }
  addResource(type, amount) {
    this.resources[type] += amount
  }
  addGood(type, amount) {
    this.goods[type] += amount
  }
  removeResource(type, amount) {
    if (this.resources[type] - amount < 0) {
      alert("Ошибка")
      return false
    } else this.resources[type] -= amount
    return true
  }
  removeGood(type, amount) {
    if (this.goods[type] - amount < 0) {
      alert("Ошибка")
      return false
    } else this.goods[type] -= amount
    return true
  }
}

exports.mousemove = function (player, gamefield) {
  return (event) => {
    if (gamefield.state == "READY") {
      player.selected_prev = player.selected
      player.selected = -1
      gamefield.field.forEach((element) => {
        if (
          distance(element.PosX, element.PosY, event.offsetX, event.offsetY) <
          constant.FIELD.HEX_SIZE
        ) {
          player.selected = element.index
        }
      })
      if (player.selected != player.selected_prev)
        gamefield.draw(player.selected)
    }
  }
}
exports.mousedown = function (player, gamefield) {
  return (ev) => {
    if (gamefield.state == "READY") {
      if (player.selected != -1) {
        var hex = gamefield.field[player.selected]
        if (hex.HasCity) {
          if (hex.City.Type == constant.CITY_TYPES.Capital) hex.HasCity = false
          else hex.City.Type += 1
        } else hex.HasCity = true
        gamefield.draw(player.selected)
      }
    }
  }
}

function distance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}
