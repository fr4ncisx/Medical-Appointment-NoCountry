import { and, rankWith, schemaMatches, schemaTypeIs, scopeEndsWith, uiTypeIs } from "@jsonforms/core";

export const passwordConfirmControlTester = rankWith(3, scopeEndsWith("repeatPassword"));
export const customDatePickerControlTester = rankWith(3, scopeEndsWith("customDatePicker"));
export const customSelectControlTester = rankWith(3, scopeEndsWith("customSelect"));
export const selectorMedicosTester = rankWith(3, scopeEndsWith("selectorMedicos"));
export const datePickerWithRangeTester = rankWith(3, scopeEndsWith("datePickerWithRange"));
export const timePickerWithRangeTester = rankWith(
    100,
    and(
        uiTypeIs('Control'),
        schemaTypeIs("object"),
        schemaMatches((schema) => {
            if(Object.prototype.hasOwnProperty.call(schema, 'customRender')) {
                const cellschema = schema as { customRender?: string };
                return cellschema.customRender === "TimePickerWithRange"
            } 
            return false;
        }),
    )
);

