import Ajv from 'ajv';
let jsonMap = require('json-source-map');

let ajv: Ajv;

export function getAjvInstance() {
  if (!ajv) {
    ajv = new Ajv({
      allErrors: true,
      allowUnionTypes: true,
      strictTypes: false,
    });
    require('ajv-keywords')(ajv);
  }
  return ajv;
}

export function validateSchema(schema: any, subject: any) {
  ajv = getAjvInstance();

  var testSchema = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        numberVerification: {
          type: 'array',
          items: {
            $ref: '#/definitions/nv',
          },
        },
        metadata: {
          type: 'array',
          items: {
            $ref: '#/definitions/metadata',
          },
        },
        status: {
          type: 'array',
          items: {
            $ref: '#/definitions/status',
          },
        },
        nodes: {
          type: 'array',
          items: {
            $ref: '#/definitions/nodes',
          },
        },
        edges: {
          type: 'array',
          items: {
            $ref: '#/definitions/edges',
          },
        },
      },
      minProperties: 1,
      maxProperties: 1,
    },
    allOf: [
      {
        contains: {
          type: 'object',
          properties: {
            numberVerification: {
              type: 'array',
              items: {
                $ref: '#/definitions/nv',
              },
            },
          },
          required: ['numberVerification'],
        },
      },
      {
        contains: {
          type: 'object',
          properties: {
            metadata: {
              type: 'array',
              items: {
                $ref: '#/definitions/metadata',
              },
            },
          },
          required: ['metadata'],
        },
      },
      {
        contains: {
          type: 'object',
          properties: {
            status: {
              type: 'array',
              items: {
                $ref: '#/definitions/status',
              },
            },
          },
          required: ['status'],
        },
      },
    ],
    definitions: {
      nvObj: {
        type: 'object',
        properties: {
          nv: {
            type: 'array',
            items: {
              $ref: '#/definitions/nv',
            },
          },
        },
        required: ['nv'],
        additionalProperties: false,
      },
      nv: {
        type: 'object',
        properties: {
          longNumber: {
            type: 'number',
          },
        },
      },
      metaDataObj: {
        type: 'object',
        properties: {
          metaData: {
            type: 'array',
            items: {
              $ref: '#/definitions/metadata',
            },
          },
        },
        additionalProperties: false,
      },
      metadata: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
        required: ['name'],
      },
      nodesObj: {
        type: 'object',
        properties: {
          nodes: {
            type: 'array',
            items: {
              $ref: '#/definitions/nodes',
            },
          },
        },
        additionalProperties: false,
        maxProperties: 1,
        required: ['nodes'],
      },
      nodes: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
        },
        required: ['id'],
      },
      nodeAttObj: {
        type: 'object',
        properties: {
          nodeAttributes: {
            type: 'array',
            items: {
              $ref: '#/definitions/nodeAtt',
            },
          },
        },
        required: ['nodeAttributes'],
        additionalProperties: false,
      },
      nodeAtt: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          nodeId: {
            type: 'number',
          },
        },
        required: ['id', 'nodeId'],
      },
      edgesObj: {
        type: 'object',
        properties: {
          edges: {
            type: 'array',
            items: {
              $ref: '#/definitions/edges',
            },
          },
        },
        required: ['edges'],
        additionalProperties: false,
      },
      edges: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          nodeId: {
            type: 'number',
          },
        },
        required: ['id', 'nodeId'],
      },
      edgeAttObj: {
        type: 'object',
        properties: {
          edgeAttributes: {
            type: 'array',
            items: {
              $ref: '#/definitions/edgeAtt',
            },
          },
        },
        required: ['edgeAttributes'],
        additionalProperties: false,
      },
      edgeAtt: {
        type: 'object',
        properties: {
          id: {
            type: 'number',
          },
          edgeId: {
            type: 'number',
          },
        },
        required: ['id', 'edgeId'],
      },
      statusObj: {
        type: 'object',
        properties: {
          status: {
            type: 'array',
            items: {
              $ref: '#/definitions/status',
            },
          },
        },
        required: ['status'],
        additionalProperties: false,
      },
      status: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
          },
        },
      },
    },
  };

  const validate = ajv.compile(testSchema);
  const valid = validate(subject);

  if (!valid) {
    let errorMessage = '';
    const sourceMap = jsonMap.stringify(subject, null, 2);
    const jsonLines = sourceMap.json.split('\n');
    validate.errors?.map((error) => {
      console.log(error);
      // errorMessage += '\n\n' + ajv.errorsText([error]);
      // console.log('errorText ', ajv.errorsText([error]));
      // console.log('errorPointers ', sourceMap.pointers);
      // console.log('error ', error);
      let errorPointer = sourceMap.pointers[error.instancePath];
      //   errorMessage += '\n> ' + jsonLines.slice(errorPointer.value.line, errorPointer.valueEnd.line).join('\n> ');
      errorMessage += `\n ${error.keyword} ${error.message} at line: ${errorPointer.value.line}, col: ${errorPointer.value.column}  \n`;
    });
    // console.log('error message', errorMessage);
    // throw new Error(errorMessage);
  }
}
