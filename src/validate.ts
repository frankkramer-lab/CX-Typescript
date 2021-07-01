import Ajv from 'ajv';
import * as pointer from 'json-pointer';
import { _network } from './schema';
import { ErrorMessage } from './models/error';
const jsonMap = require('json-source-map');

let ajv: Ajv;
let errorMessages: ErrorMessage[] = [];

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

export function validateDataAgainstSchema(data: any) {
  ajv = getAjvInstance();
  try {
    const sourceMap = jsonMap.parse(data);
    const validate = ajv.compile(_network);
    const valid = validate(sourceMap.data);

    if (!valid) {
      validate.errors?.map((error) => {
        if (error.keyword === 'errorMessage') {
          const errorPointer = sourceMap.pointers[error.instancePath];
          const splittedMessage = error.message!.split(':', 2);
          addError(splittedMessage[0], splittedMessage[1], errorPointer);
        }
      });
    }
  } catch (error) {
    addError('invalid_json_format', error.message, null);
  }
  return errorMessages;
}

function addError(aspectName: string, message: string, errorPointer?: any) {
  const errorMessage: ErrorMessage = {
    aspectName,
    message,
  };
  if (errorPointer !== null) {
    errorMessage.loc = {
      value: {
        line: errorPointer.value.line + 1,
        column: errorPointer.value.column,
        pos: errorPointer.value.pos,
      },
      valueEnd: {
        line: errorPointer.valueEnd.line + 1,
        column: errorPointer.valueEnd.column,
        pos: errorPointer.valueEnd.pos,
      },
    };
    if (errorPointer?.key !== undefined && errorPointer?.key !== null) {
      errorMessage.loc.key = {
        line: errorPointer.key.line + 1,
        column: errorPointer.key.column,
        pos: errorPointer.key.pos,
      };
    }
    if (errorPointer?.keyEnd !== undefined && errorPointer?.keyEnd !== null) {
      errorMessage.loc.keyEnd = {
        line: errorPointer.keyEnd.line + 1,
        column: errorPointer.keyEnd.column,
        pos: errorPointer.keyEnd.pos,
      };
    }
  }
  errorMessages.push(errorMessage);
}
