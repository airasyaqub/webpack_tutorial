export class ComponentService {

  // numberOneInput = null;
  // numberTwoInput  = null;
  // addValuesButton = null;
  // resultDiv = null;

  constructor() {
    this.numberOneInput = document.getElementById("numberOne");
    this.numberTwoInput = document.getElementById("numberTwo");
    this.addValuesButton = document.getElementById("addValues");
    this.resultDiv = document.getElementById("result");
    // console.log(this.numberOneInput.jaaani) // to test TS source maps
  }

  getInputs() {
    return [this.numberOneInput.value, this.numberTwoInput.value];
  }

  setResult(str) {
    this.resultDiv.innerText = str;
  }

  onClick(cb) {
    this.addValuesButton.addEventListener("click", cb);
  }
}
