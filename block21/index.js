class Car {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  getDescription() {
    return `This ${this.make} ${this.model} is mint from the year ${this.year}.`;
  }
}

class ElectricCar extends Car {
  constructor(make, model, year, range) {
    super(make, model, year);
    this.range = range;
  }

  getDescription() {
    return `${super.getDescription()} It has a range of ${this.range}.`;
  }
}

const newCar = new ElectricCar("Tesla", "Model S", 2019, 300);

console.log(newCar.getDescription());
