import Ajv from 'ajv';
import { _network } from './schema/network.schema';
import { ErrorLocation, ErrorMessage } from './models/error';
import { AspectCore, AspectSettings } from './helpers/enums/aspects.enum';
const jsonMap = require('json-source-map');

let ajv: Ajv;
let data: any[] = [];
let pointers: any = {};
export const errorMessages: ErrorMessage[] = [];

export function getAjvInstance() {
  if (!ajv) {
    ajv = new Ajv({
      allErrors: true,
      allowUnionTypes: true,
      strictTypes: false,
      verbose: false,
    });
    require('ajv-errors')(ajv);
  }
  return ajv;
}

export function validateDataAgainstSchema(networkFile: any) {
  ajv = getAjvInstance();
  try {
    const sourceMap = jsonMap.parse(networkFile);
    data = sourceMap.data;
    pointers = sourceMap.pointers;
    const validate = ajv.compile(_network);
    const valid = validate(data);

    if (!valid) {
      validate.errors?.map((error) => {
        if (error.keyword === 'errorMessage') {
          const errorPointer = pointers[error.instancePath];
          const splittedMessage = error.message!.split(':', 2);
          addError(splittedMessage[0], splittedMessage[1], [errorPointer]);
        }
      });
    }
    validateDataContent();
  } catch (error) {
    addError('invalid_json_format', error.message, null);
  }
  return errorMessages;
}

export function validateDataContent() {
  validateUniqueProperties(AspectSettings.METADATA, 'name');
  validateUniqueProperties(AspectCore.NODES, '@id');
  validateUniqueProperties(AspectCore.EDGES, '@id');
}

function validateUniqueProperties(aspectName: AspectSettings | AspectCore, propertyName: string) {
  const aspectIndex = data.findIndex((aspects) => {
    const keys = Object.keys(aspects);
    if (keys.includes(aspectName)) return true;
    return false;
  });

  if (aspectIndex > 0) {
    const aspect = data[aspectIndex][aspectName];
    const basePointer: string = `/${aspectIndex}/${aspectName}`;
    const map: any = {};

    for (let i = 0; i < aspect.length; i++) {
      const aspectElemet = aspect[i];
      (map[aspectElemet[propertyName]] || (map[aspectElemet[propertyName]] = [])).push(i);
    }

    for (const prop in map) {
      if (map[prop] && map[prop].length > 1) {
        let errorPointers = getErrorLocation(basePointer, map[prop], propertyName);
        addError(aspectName, `"${propertyName}: ${prop}" already exist`, errorPointers);
      }
    }
  }
}

function getErrorLocation(basePointer: string, indexes: number[], propertyName: string) {
  const errorLocations = [];
  for (const index of indexes) {
    const pointer = `${basePointer}/${index}/${propertyName}`;
    errorLocations.push(pointers[pointer]);
  }
  return errorLocations;
}

function addError(aspectName: string, message: string, errorPointer?: any) {
  const errorMessage: ErrorMessage = {
    aspectName,
    message,
  };

  if (errorPointer !== null) {
    errorMessage.loc = [];
    let errorLocation: ErrorLocation;
    errorPointer.map((pointer: any) => {
      errorLocation = {
        value: {
          line: pointer.value.line + 1,
          column: pointer.value.column,
          pos: pointer.value.pos,
        },
        valueEnd: {
          line: pointer.valueEnd.line + 1,
          column: pointer.valueEnd.column,
          pos: pointer.valueEnd.pos,
        },
      };
      if (pointer?.key !== undefined && pointer?.key !== null) {
        errorLocation.key = {
          line: pointer.key.line + 1,
          column: pointer.key.column,
          pos: pointer.key.pos,
        };
      }
      if (pointer?.keyEnd !== undefined && pointer?.keyEnd !== null) {
        errorLocation.keyEnd = {
          line: pointer.keyEnd.line + 1,
          column: pointer.keyEnd.column,
          pos: pointer.keyEnd.pos,
        };
      }
      errorMessage.loc?.push(errorLocation);
    });
  }
  errorMessages.push(errorMessage);
}
