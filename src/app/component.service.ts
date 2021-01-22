export class ComponentService {

  numberOneInput: any = null;
  numberTwoInput : any = null;
  addValuesButton : HTMLElement = null;
  resultDiv : HTMLElement = null;

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

  setResult(str: string) {
    this.resultDiv.innerText = str;
  }

  onClick(cb: any) {
    this.addValuesButton.addEventListener("click", cb);
  }
}
