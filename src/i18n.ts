import localization from 'localized-strings';

const errorMessages = new localization({
  en: {
    type_is_array: '{aspect_name}:{property_name} must be of type "array"',
    type_is_object: '{aspect_name}:{property_name} must be of type "object"',
    type_is_number: '{aspect_name}:{property_name} must be of type "number"',
    type_is_integer: '{aspect_name}:{property_name} must be of type "integer"',
    type_is_string: '{aspect_name}:{property_name} must be of type "string"',
    type_is_boolean: '{aspect_name}:{property_name} must be of type "boolean"',
    type_is_array_of_number: '{aspect_name}:{property_name} must be of type "Number[]"',
    type_is_array_of_integer: '{aspect_name}:{property_name} must be of type "Integer[]"',
    type_is_array_of_string: '{aspect_name}:{property_name} must be of type "String[]"',
    type_is_array_of_boolean: '{aspect_name}:{property_name} must be of type "Boolean[]"',
    required: '{aspect_name}:{property_name} is a required property',
    minimum: '{aspect_name}:{property_name} must be greater or equal to 0',
    additional_properties: '{aspect_name}:must not have additional properties {property_name}',
    uniqueItems: '{aspect_name}:must not have additional properties {property_name}',
    enum: '{aspect_name}:must be equal to one of the allowed values {property_name}',
    invalid_pattern: '{aspect_name}:{property_name} does not match the specific pattern (accepted "_" or alphanumeric)',
    min_properties: '{aspect_name}:{property_name} must not have fewer than 1 property',
    max_properties: '{aspect_name}:{property_name} must not have more than 1 property',
    contains: '{aspect_name}:must contain {property_name} property',
  },
  de: {
    type_is_object: '{aspect_name}:{property_name} muss vom Typ Objekt sein',
    type_is_number: '{aspect_name}:{property_name} muss von der Typennummer sein',
    required: '{aspect_name}:{property_name} ist eine erforderliche Eigenschaft',
    additional_properties: '{aspect_name}:darf keine zusätzlichen Eigenschaften haben {property_name}',
  },
});

export function getErrorMessage(key: string, aspectName: string, propertyName: string): string {
  return errorMessages.getString(key).replace('{aspect_name}', aspectName).replace('{property_name}', propertyName);
}

export function setLanguage(languageCode: string): void {
  errorMessages.setLanguage(languageCode);
}
