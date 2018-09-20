class My {
  constructor(name) {
    this.name = name;
  }
  info(msg) {
    console.log(`Info: ${msg}`);
  }
  
  log(msg) {
    console.log(`Log: ${msg}: ${this.name}`);
  }
}

module.exports = My;