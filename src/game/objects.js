const constant = require("./const.json")
import img_city_1 from "../static/city_1.jpg"
import img_city_2 from "../static/city_2.jpg"
import img_city_3 from "../static/city_3.jpg"
import img_hunter from "../static/hunter.png"

const Images = {
  Road: {
    img: new Image(),
    loaded: false,
  },
  Knight: {
    img: new Image(),
    loaded: false,
  },
  City_Vill: {
    img: new Image(),
    loaded: false,
  },
  City_City: {
    img: new Image(),
    loaded: false,
  },
  City_Capi: {
    img: new Image(),
    loaded: false,
  },
  Bandit: {
    img: new Image(),
    loaded: false,
  },
}

function loadImages() {
  Images.Road.img.src = ""
  Images.Road.img.onload = () => {
    Images.Road.loaded = true
  }
  Images.Knight.img.src = ""
  Images.Knight.img.onload = () => {
    Images.Knight.loaded = true
  }
  Images.City_Capi.img.src = img_city_3
  Images.City_Capi.img.onload = () => {
    Images.City_Capi.loaded = true
  }
  Images.City_Vill.img.src = img_city_1
  Images.City_Vill.img.onload = () => {
    Images.City_Vill.loaded = true
  }
  Images.City_City.img.src = img_city_2
  Images.City_City.img.onload = () => {
    Images.City_City.loaded = true
  }
  Images.Bandit.img.src = img_hunter
  Images.Bandit.img.onload = () => {
    Images.Bandit.loaded = true
  }
}
loadImages()
class Road {
  constructor() {}
  get Art() {}
}
class Knight {
  constructor() {}
  get Art() {}
}
class City {
  constructor() {
    this.type = constant.CITY_TYPES.Village
  }
  get Art() {
    switch (this.type) {
      case constant.CITY_TYPES.Village:
        return Images.City_Vill.loaded ? Images.City_Vill.img : false
      case constant.CITY_TYPES.City:
        return Images.City_City.loaded ? Images.City_City.img : false
      case constant.CITY_TYPES.Capital:
        return Images.City_Capi.loaded ? Images.City_Capi.img : false
      default:
        return false
    }
  }
  set Type(type) {
    this.type = type
  }
  get Type() {
    return this.type
  }
}
class Bandit {
  constructor() {}
  get Art() {
    return Images.Bandit.loaded ? Images.Bandit.img : false
  }
}

module.exports = {
  Road,
  Knight,
  City,
  Bandit,
}
