(function() {
  'use strict';

  angular
      .module('app.farol')
      .controller('FrlFieldRouterController', FrlFieldRouterController);

  /**
   * Controller for Farol Router Field Component
   * @param {Function} $interpolate
   * @param {Service} ObjectQueryService
   * @param {Service} LoadingSplashService
   * @param {Service} GetItemsFromServerService
   * @param {Service} UserManagerService
   * @constructor
   * @ngInject
   */
  function FrlFieldRouterController(
      $interpolate,
      ObjectQueryService,
      LoadingSplashService,
      GetItemsFromServerService,
      UserManagerService,
  ) {
    // variables
    const vmcpt = this;
    // Methods
    // init
    vmcpt.$onInit = async () => {
      const loadingId = LoadingSplashService.showLoading(true);
      vmcpt.definitions = {};
      // Check if required data is available
      if (vmcpt.rawDefinitions && vmcpt.rawDefinitions.fieldtype) {
        vmcpt.baseModel = vmcpt.baseModel || vmcpt.model;
        vmcpt.modelPath = vmcpt.modelPath || '';
        // get field model name
        if (vmcpt.modelPath.includes('.')) {
          const lastDot = vmcpt.modelPath.lastIndexOf('.');
          vmcpt.fieldModelName = vmcpt.modelPath.slice(lastDot + 1);
        } else {
          vmcpt.fieldModelName = vmcpt.modelPath;
        }
        // Prepare interpolation context;
        const interpolateContext = {
          model: vmcpt.model,
          basemodel: vmcpt.baseModel,
          modelpath: vmcpt.modelPath,
          getuserrole: UserManagerService.getUserRole,
          getuserid: UserManagerService.getUserId,
          modelparentn: (n) => {
            const pathArray = vmcpt.modelPath.split('.');
            const pathArrayLength = pathArray.length - 1;
            let parentN =
              n > pathArrayLength
                ? pathArray[0]
                : pathArray[pathArrayLength - n];
            if (typeof parentN === 'string' && parentN.includes(':')) {
              const splitParentN = parentN.split(':', 2);
              parentN = {field: splitParentN[0], value: splitParentN[1]};
            }
            return parentN;
          },
        };
        // Check if any definition field needs to be resolved
        // and puts it on the pipeline
        try {
          await Promise.all(
              Object.keys(vmcpt.rawDefinitions).map(async (definitionKey) => {
                const definition = vmcpt.rawDefinitions[definitionKey];
                const params = definition.params;
                switch (definition.method) {
                  case 'static':
                    vmcpt.definitions[definitionKey] = {
                      modelObject: {
                        item:
                        typeof params === 'string'
                          ? $interpolate(params)(interpolateContext)
                          : params,
                      },
                      modelAttribute: 'item',
                    };
                    break;
                  case 'model':
                    if (params && params.path) {
                      const path = $interpolate(params.path)(interpolateContext);
                      if (path.includes('.')) {
                        const lastDot = path.lastIndexOf('.');
                        vmcpt.definitions[definitionKey] = {
                          modelObject: ObjectQueryService.getProperty(
                              path.slice(0, lastDot),
                              vmcpt.model,
                          ),
                          modelAttribute: path.slice(lastDot + 1),
                        };
                      } else {
                        vmcpt.definitions[definitionKey] = {
                          modelObject: vmcpt.model,
                          modelAttribute: path,
                        };
                      }
                    } else {
                      throw 'missingParams';
                    }
                    break;
                  case 'basemodel':
                    if (params && params.path) {
                      const path = $interpolate(params.path)(interpolateContext);
                      if (params.filterpath && params.filtercondition) {
                        vmcpt.definitions[definitionKey] = {
                          modelObject: {
                            item: ObjectQueryService.getProperty(
                                path,
                                vmcpt.baseModel,
                            ).filter((filterItem) =>
                              ObjectQueryService.getProperty(
                                  params.filterpath,
                                  filterItem,
                              ).includes(params.filtercondition),
                            ),
                          },
                          modelAttribute: 'item',
                        };
                      } else {
                        if (path.includes('.')) {
                          const lastDot = path.lastIndexOf('.');
                          vmcpt.definitions[definitionKey] = {
                            modelObject: ObjectQueryService.getProperty(
                                path.slice(0, lastDot),
                                vmcpt.baseModel,
                            ),
                            modelAttribute: path.slice(lastDot + 1),
                          };
                        } else {
                          vmcpt.definitions[definitionKey] = {
                            modelObject: vmcpt.baseModel,
                            modelAttribute: path,
                          };
                        }
                      }
                    } else {
                      throw 'missingParams';
                    }
                    break;
                  case 'frlapi':
                    if (params && params.frlentity && params.frlmethod) {
                      const frlentity =
                      typeof params.frlentity === 'string'
                        ? $interpolate(params.frlentity)(interpolateContext)
                        : params.frlentity;
                      const frlmethod =
                      typeof params.frlmethod === 'string'
                        ? $interpolate(params.frlmethod)(interpolateContext)
                        : params.frlmethod;
                      const frlparams =
                      typeof params.frlparams === 'string'
                        ? $interpolate(params.frlparams)(interpolateContext)
                        : params.frlparams;
                      vmcpt.definitions[definitionKey] = {
                        modelObject: {
                          item: await GetItemsFromServerService.getData(
                              frlentity,
                              frlmethod,
                              frlparams,
                          ),
                        },
                        modelAttribute: 'item',
                      };
                    } else {
                      throw 'missingParams';
                    }
                    break;
                  default:
                    vmcpt.definitions[definitionKey] = {
                      modelObject: {item: definition},
                      modelAttribute: 'item',
                    };
                    break;
                }
              }),
          );
          vmcpt.component = vmcpt.definitions.fieldtype.modelObject[vmcpt.definitions.fieldtype.modelAttribute];
          vmcpt.loaded = true;
        } catch (error) {
          if (
            [
              'badServerResponse',
              'invalidMethod',
              'unknownMethod',
              'missingParams',
            ].includes(error)
          ) {
            vmcpt.loaded = false;
          } else {
            throw error;
          }
        }
      } else {
        vmcpt.loaded = false;
      }
      LoadingSplashService.hideLoading(loadingId);
    };
  }
})();

// definitions: {
//   field_name: { params: 'CATEGORY', method: 'static'}
//   order: { params: 1, method: 'static'}
//   fieldtype: { params: 'outsideSelect', method: 'static'}
//   readonly: { params: true, method: 'static'}
//   required: { params: true, method: 'static'}
// }
