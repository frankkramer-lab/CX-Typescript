import Ajv, { ValidateFunction } from 'ajv';
import { _network } from './schema/network.schema';
import { ErrorLocation, ErrorMessage } from './models/error';
import { AspectCore, AspectCytoscape, AspectSettings } from './helpers/enums/aspects.enum';
import { Constant } from './helpers/enums/constant';
// tslint:disable-next-line: no-var-requires
const jsonMap = require('json-source-map');
const now = require('performance-now');

let ajv: Ajv;
let validate: ValidateFunction<unknown>;
let data: any[] = [];
let pointers: any = {};
let errorMessages: ErrorMessage[] = [];

/**
 * This method is used to get the ajv instance as a singlton
 * @returns
 */
export function getAjvInstance() {
  if (!ajv) {
    ajv = new Ajv({
      allErrors: true,
      strictTypes: false,
    });
    require('ajv-errors')(ajv);
  }
  return ajv;
}

/**
 * This method is used to compile the network schema only once accross the application
 * https://ajv.js.org/guide/getting-started.html#basic-data-validation
 * @returns
 */
function getValidateInstance() {
  if (!validate) {
    validate = ajv.compile(_network);
  }
  return validate;
}

/**
 * This method is used to validate the data based on 2 craiteria
 * - Json Schema  
 * - Custom validation
 * @param networkFile 
 * @returns 
 */
export function validateCxData(networkFile: any) {
  try {
    const t1 = now();
    const sourceMap = jsonMap.parse(networkFile);
    const t2 = now();
    console.log(`parsing json string took: ${t2-t1} ms`);
    data = sourceMap.data;
    pointers = sourceMap.pointers;
    errorMessages = [];
    const t3 = now();
    validateDataAgainstSchema();
    const t4 = now();
    console.log(`valdation of json schema took: ${t4-t3} ms`);
    const t5 = now();
    validateDataContent();
    const t6 = now();
    console.log(`valdation against custom validation took: ${t6-t5} ms`);
  } catch (error) {
    addError('invalid_json_format', error.message, null);
  }
  return errorMessages;
}

/**
 * This method is used to validate data against json schema
 */
function validateDataAgainstSchema() {
  const t1 = now();
  ajv = getAjvInstance();
  const t2 = now();
  console.log(`getting ajv instance took: ${t2-t1} ms`);
  const t3 = now();
  validate = getValidateInstance();
  const t4 = now();
  console.log(`compiling ajv against schema took: ${t4-t3} ms`);
  const t5 = now();
  const valid = validate(data);
  const t6 = now();
  console.log(`calling validate function took: ${t5-t6} ms`);
  if (!valid) {
    const errors = validate.errors?.filter((error) => error.keyword === 'errorMessage');
    errors?.map((error) => {
      const errorPointer = pointers[error.instancePath];
      const splittedMessage = error.message!.split(':', 2);
      addError(splittedMessage[0], splittedMessage[1], [errorPointer]);
    });
  }
}

/**
 * This method is used to validate data against custom data
 */
export function validateDataContent(): void {
  validateUniqueProperties(AspectSettings.METADATA, Constant.Name, false);
  validateUniqueProperties(AspectCore.NODES, Constant.Id, false);
  validateUniqueProperties(AspectCore.EDGES, Constant.Id, false);
  validateUniqueProperties(AspectCytoscape.CY_GROUPS, Constant.Id, false);
  validateUniqueProperties(AspectCytoscape.CY_SUBNETWORKS, Constant.Id, false);

  validateUniqueProperties(AspectCytoscape.CY_GROUPS, Constant.Nodes, true);
  validateUniqueProperties(AspectCytoscape.CY_GROUPS, Constant.External_Edges, true);
  validateUniqueProperties(AspectCytoscape.CY_GROUPS, Constant.Internal_Edges, true);
  validateUniqueProperties(AspectCytoscape.CY_SUBNETWORKS, Constant.Nodes, true);
  validateUniqueProperties(AspectCytoscape.CY_SUBNETWORKS, Constant.Edges, true);

  validatePropertyValueExistence(AspectCore.EDGES, AspectCore.NODES, Constant.S, Constant.Id, false);
  validatePropertyValueExistence(AspectCore.EDGES, AspectCore.NODES, Constant.T, Constant.Id, false);
  validatePropertyValueExistence(AspectCore.NODE_ATTRIBUTES, AspectCore.NODES, Constant.Po, Constant.Id, false);
  validatePropertyValueExistence(AspectCore.CARTESIAN_LAYOUT, AspectCore.NODES, Constant.Node, Constant.Id, false);
  validatePropertyValueExistence(AspectCytoscape.CY_GROUPS, AspectCore.NODES, Constant.Nodes, Constant.Id, false);

  validatePropertyValueExistence(
    AspectCytoscape.CY_HIDDEN_ATTRIBUTES,
    AspectCytoscape.CY_SUBNETWORKS,
    Constant.S,
    Constant.Id,
    false,
  );
  validatePropertyValueExistence(
    AspectCytoscape.CY_TABLE_COLUMN,
    AspectCytoscape.CY_SUBNETWORKS,
    Constant.S,
    Constant.Id,
    false,
  );
  validatePropertyValueExistence(
    AspectCore.NODE_ATTRIBUTES,
    AspectCytoscape.CY_SUBNETWORKS,
    Constant.S,
    Constant.Id,
    false,
  );
  validatePropertyValueExistence(
    AspectCore.EDGE_ATTRIBUTES,
    AspectCytoscape.CY_SUBNETWORKS,
    Constant.S,
    Constant.Id,
    false,
  );
  validatePropertyValueExistence(
    AspectCore.NETWORK_ATTRIBUTES,
    AspectCytoscape.CY_SUBNETWORKS,
    Constant.S,
    Constant.Id,
    false,
  );

  validatePropertyValueExistence(
    AspectCytoscape.CY_GROUPS,
    AspectCore.EDGES,
    Constant.External_Edges,
    Constant.Id,
    true,
  );
  validatePropertyValueExistence(
    AspectCytoscape.CY_GROUPS,
    AspectCore.EDGES,
    Constant.Internal_Edges,
    Constant.Id,
    true,
  );
  validatePropertyValueExistence(AspectCytoscape.CY_SUBNETWORKS, AspectCore.NODES, Constant.Nodes, Constant.Id, true);
  validatePropertyValueExistence(AspectCytoscape.CY_SUBNETWORKS, AspectCore.EDGES, Constant.Edges, Constant.Id, true);
}

function validatePropertyValueExistence(
  sourceAspectName: AspectCore | AspectCytoscape,
  destinationAspectName: AspectCore | AspectCytoscape,
  sourceProperty: string,
  destinationProperty: string,
  propertyValueIsArray: boolean,
) {
  const sourceAspectIndex = getAspectIndex(sourceAspectName);
  const destinationAspectIndex = getAspectIndex(destinationAspectName);
  if (sourceAspectIndex >= 0 && destinationAspectIndex >= 0) {
    const basePointer: string = `/${sourceAspectIndex}/${sourceAspectName}`;
    const map: any = {};
    const sourceAspect = data[sourceAspectIndex][sourceAspectName];
    const destinationAsepctPropertyValues: any[] = data[destinationAspectIndex][destinationAspectName].map(
      (aspectElement: any) => aspectElement[destinationProperty],
    );

    if (propertyValueIsArray) {
      getPropertyValueIndexesForArray(sourceAspect, map, sourceProperty);
      for (const prop in map) {
        if (prop) {
          for (const propertyIndex in map[prop]) {
            if (map[prop][propertyIndex] && !destinationAsepctPropertyValues.includes(Number(prop))) {
              const errorPointers = getErrorLocationWithArray(
                basePointer,
                Number(propertyIndex),
                map[prop][propertyIndex],
                sourceProperty,
              );
              addError(
                sourceAspectName,
                `"${sourceProperty}: ${prop}" does not point to a valid "${destinationProperty}" in "${destinationAspectName}"`,
                errorPointers,
              );
            }
          }
        }
      }
    } else {
      getPropertyValueIndexes(sourceAspect, map, sourceProperty);
      for (const prop in map) {
        if (prop && !destinationAsepctPropertyValues.includes(Number(prop))) {
          const errorPointers = getErrorLocation(basePointer, map[prop], sourceProperty);
          addError(
            sourceAspectName,
            `"${sourceProperty}: ${prop}" does not point to a valid "${destinationProperty}" in "${destinationAspectName}"`,
            errorPointers,
          );
        }
      }
    }
  }
}

function validateUniqueProperties(
  aspectName: AspectSettings | AspectCore | AspectCytoscape,
  propertyName: string,
  propertyValueIsArray: boolean,
) {
  const aspectIndex = getAspectIndex(aspectName);

  if (aspectIndex >= 0) {
    const aspect = data[aspectIndex][aspectName];
    const basePointer: string = `/${aspectIndex}/${aspectName}`;
    const map: any = {};

    if (propertyValueIsArray) {
      getPropertyValueIndexesForArray(aspect, map, propertyName);
      for (const prop in map) {
        if (prop) {
          for (const propertyIndex in map[prop]) {
            if (map[prop][propertyIndex] && map[prop][propertyIndex].length > 1) {
              const errorPointers = getErrorLocationWithArray(
                basePointer,
                Number(propertyIndex),
                map[prop][propertyIndex],
                propertyName,
              );
              addError(aspectName, `"${prop}" already exist in ${propertyName} array`, errorPointers);
            }
          }
        }
      }
    } else {
      getPropertyValueIndexes(aspect, map, propertyName);
      for (const prop in map) {
        if (map[prop] && map[prop].length > 1) {
          const errorPointers = getErrorLocation(basePointer, map[prop], propertyName);
          addError(aspectName, `"${propertyName}: ${prop}" already exist`, errorPointers);
        }
      }
    }
  }
}

function getPropertyValueIndexes(aspect: any, map: any, propertyName: string) {
  for (let i = 0; i < aspect.length; i++) {
    const aspectElemet = aspect[i];
    const value = aspectElemet[propertyName];
    if (value) (map[value] || (map[value] = [])).push(i);
  }
}

function getPropertyValueIndexesForArray(aspect: any, map: any, propertyName: string) {
  for (let i = 0; i < aspect.length; i++) {
    const aspectElemet = aspect[i];
    const value = aspectElemet[propertyName];
    if (value && Array.isArray(value)) {
      for (let j = 0; j < value.length; j++) {
        const element = value[j];
        const mapElement = map[element];
        if (mapElement) {
          const mapElementIndex = mapElement[i];
          if (mapElementIndex) {
            mapElementIndex.push(j);
          } else {
            mapElement[i] = [j];
          }
        } else {
          const elementIndex: any = {};
          elementIndex[i] = [j];
          map[element] = elementIndex;
        }
      }
    }
  }
}

function getAspectIndex(aspectName: AspectSettings | AspectCore | AspectCytoscape) {
  return data.findIndex((aspects) => {
    const keys = Object.keys(aspects);
    if (keys.includes(aspectName)) return true;
    return false;
  });
}

function getErrorLocation(basePointer: string, indexes: number[], propertyName: string) {
  const errorLocations = [];
  for (const index of indexes) {
    const pointer = `${basePointer}/${index}/${propertyName}`;
    errorLocations.push(pointers[pointer]);
  }
  return errorLocations;
}

function getErrorLocationWithArray(
  basePointer: string,
  propertyIndex: number,
  indexes: number[],
  propertyName: string,
) {
  const errorLocations = [];
  for (const index of indexes) {
    const pointer = `${basePointer}/${propertyIndex}/${propertyName}/${index}`;
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
