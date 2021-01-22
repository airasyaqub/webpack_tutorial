import { inputsAreValid } from "./utils/inputs-are-valid";
import { parseInputs } from "./utils/parse-inputs";
import { AlertService } from ".././app/alert.service";
import { ComponentService } from ".././app/component.service";


export const run = (alertService: AlertService, componentService: ComponentService) => {
  alertService.hideErrors();

  componentService.onClick(() => {
    alertService.hideErrors();
    const inputs = componentService.getInputs();
    const parsedInputs = parseInputs(...inputs);
    if (inputsAreValid(...parsedInputs)) {
      const [numA, numB] = parsedInputs;
      componentService.setResult(numA + numB + '');
    } else {
      componentService.setResult("");
      alertService.handleAdditionError(inputs, parsedInputs);
    }
  });
};
