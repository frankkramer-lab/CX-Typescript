import Ajv from 'ajv';
import { _network } from './schema/network.schema';
import { ErrorLocation, ErrorMessage } from './models/error';
import { AspectCore, AspectCytoscape, AspectSettings } from './helpers/enums/aspects.enum';
import { Constant } from './helpers/enums/constant';
const jsonMap = require('json-source-map');

let ajv: Ajv;
let data: any[] = [];
let pointers: any = {};
const errorMessages: ErrorMessage[] = [];

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

export function validateCxData(networkFile: any) {
  try {
    const sourceMap = jsonMap.parse(networkFile);
    data = sourceMap.data;
    pointers = sourceMap.pointers;
    validateDataAgainstSchema();
    validateDataContent();
  } catch (error) {
    addError('invalid_json_format', error.message, null);
  }
  return errorMessages;
}

function validateDataAgainstSchema() {
  ajv = getAjvInstance();
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
}

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

  validatePropertyValueExistence(AspectCytoscape.CY_HIDDEN_ATTRIBUTES, AspectCytoscape.CY_SUBNETWORKS, Constant.S, Constant.Id, false);
  validatePropertyValueExistence(AspectCytoscape.CY_TABLE_COLUMN, AspectCytoscape.CY_SUBNETWORKS, Constant.S, Constant.Id, false);
  validatePropertyValueExistence(AspectCore.NODE_ATTRIBUTES, AspectCytoscape.CY_SUBNETWORKS, Constant.S, Constant.Id, false);
  validatePropertyValueExistence(AspectCore.EDGE_ATTRIBUTES, AspectCytoscape.CY_SUBNETWORKS, Constant.S, Constant.Id, false);
  validatePropertyValueExistence(AspectCore.NETWORK_ATTRIBUTES, AspectCytoscape.CY_SUBNETWORKS, Constant.S, Constant.Id, false);

  validatePropertyValueExistence(AspectCytoscape.CY_GROUPS, AspectCore.EDGES, Constant.External_Edges, Constant.Id, true);
  validatePropertyValueExistence(AspectCytoscape.CY_GROUPS, AspectCore.EDGES, Constant.Internal_Edges, Constant.Id, true);
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
