import { materialRenderers } from "@jsonforms/material-renderers";
import { customDatePickerControlTester, customSelectControlTester, datePickerWithRangeTester, passwordConfirmControlTester, selectorMedicosTester, timePickerWithRangeTester } from "./JsonFormTesters";
import PasswordConfirmControl from "@components/custom-controls/PasswordConfirmControl";
import CustomDatePickerControl from "@components/custom-controls/CustomDatePickerControl";
import CustomSelectControl from "@components/custom-controls/CustomSelectControl";
import DatePickerWithRange from "@components/custom-controls/DatePickerWithRange";
import SelectorMedicos from "@components/custom-controls/SelectorMedicos";
import TimePickerWithRange from "@components/custom-controls/TimePickerWithRange";

const renderers = [
  ...materialRenderers,
  { tester: passwordConfirmControlTester, renderer: PasswordConfirmControl },
  { tester: customDatePickerControlTester, renderer: CustomDatePickerControl },
  { tester: customSelectControlTester, renderer: CustomSelectControl},
  { tester: selectorMedicosTester, renderer: SelectorMedicos},
  { tester: datePickerWithRangeTester, renderer: DatePickerWithRange },
  { tester: timePickerWithRangeTester, renderer: TimePickerWithRange}
];

export default renderers;