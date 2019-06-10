(function() {
  'use strict';

  angular
      .module('FarolComponents')
      .controller('FrlDefinitionTabber', FrlDefinitionTabber);

  /**
   * Controller for Farol Definition Rower Component
   * @param {*} $scope
   * @param {Service} LoadingSplashService
   * @param {Service} ObjectQueryService
   * @param {Service} ObjectIdService
   * @constructor
   * @ngInject
   */
  function FrlDefinitionTabber(
      $scope,
      LoadingSplashService,
      ObjectQueryService,
      ObjectIdService,
  ) {
    // variables
    const vmcpt = this;
    const itemsToDestroy = [];
    // Methods
    // init

    /**
     * Receives a child object, ensures original object
     * has an _id, then decouples from original object,
     * parses its name and assign childrenDefinitions if
     * it exists
     * @param {Object} child
     * @return {Object}
     */
    const parseChild = (child) => {
      child = JSON.parse(JSON.stringify(child));
      child.name = vmcpt.itemNameField
        ? child[vmcpt.itemNameField]
        : child.name;
      if (vmcpt.modelFilterField) {
        child.modelPath = vmcpt.modelPath.concat(
          vmcpt.modelPath ? '.' : '',
          vmcpt.modelFilterField,
          ':',
          child._id,
        );
      }
      child.definitions = child.definitions || {};
      if (vmcpt.childrenDefinitions) {
        child.definitions = Object.assign(
            child.definitions,
            JSON.parse(JSON.stringify(vmcpt.childrenDefinitions)),
        );
      }
      return child;
    };

    /**
     * Pushes a new child in the children array, sets
     * necessary watches and if modelFilterField, set
     * the modelChild data structure
     * @param {*} child
     */
    function pushNewChild(child) {
      // Ensure object has _id on definition source before tracking it
      child._id = child._id || ObjectIdService.getString();
      // Add new child to the list of tracked childs
      vmcpt.children.push(parseChild(child));
      // Insert watch destroy function on control list
      itemsToDestroy.push({
        _id: child._id,
        // Create watch on child definition source
        item: $scope.$watchCollection('child', (newChild, oldChild, scope) => {
          if (newChild) {
            const childIndex = vmcpt.children.findIndex(
                (parsedChild) => newChild._id === parsedChild._id,
            );
            if (childIndex === -1) {
              // If child does not yet exist on tracking list, add it
              pushNewChild(newChild);
            } else {
              vmcpt.children[childIndex] = parseChild(newChild);
            }
          }
        }),
      });
      if (vmcpt.modelFilterField) {
        // Filter model by child _id adding results to childmodel
        vmcpt.childrenModel[child._id] = vmcpt.model
            .filter((childModelItem) => {
              return (
                child._id ===
              ObjectQueryService.getProperty(
                  vmcpt.modelFilterField,
                  childModelItem,
              )
              );
            })
        // Ensure the items being added contains _id
            .map((childModelItem) => {
              childModelItem._id =
              childModelItem._id || ObjectIdService.getString();
              return childModelItem;
            });
        itemsToDestroy.push({
          id: child._id,
          // Create watch to monitor child model and replicate on model
          item: $scope.$watchCollection(
              function(currentScope){ 
                return vmcpt.childrenModel[child._id]
              },
              (newChildModel, oldChildModel, scope) => {
              // check if item has been added
                if (newChildModel && oldChildModel) {
                  if (newChildModel.length > oldChildModel.length) {
                  // find added item
                    const newChildModelItem = newChildModel.find((newItem) => {
                      return !oldChildModel.some((oldItem) => {
                        return oldItem._id === newItem._id;
                      });
                    });
                    newChildModelItem._id =
                    newChildModelItem._id || ObjectIdService.getString();
                    newChildModelItem[vmcpt.modelFilterField] = child._id;
                    vmcpt.model.push(newChildModelItem);
                  // Check if item has been removed
                  } else if (oldChildModel.length > newChildModel.length) {
                  // Find deleted child
                    const deletedChildModelItem = oldChildModel.find(
                        (oldItem) => {
                          return !newChildModel.some((newItem) => {
                            return newItem._id === oldItem._id;
                          });
                        },
                    );
                    // Find deleted item index on model
                    const indexToDelete = vmcpt.model.findIndex((item) => {
                      return item._id === deletedChildModelItem._id;
                    });
                    if (indexToDelete !== -1) {
                      vmcpt.model.splice(indexToDelete, 1);
                    }
                  }
                }
              },
              // true,
          ),
        });
      }
    }

    /**
     * Delete child model data if child definition is deleted
     * and remove watches
     * @param {Object} child
     */
    const deleteChild = (child) => {
      deleteWatch(child._id);
      if (vmcpt.modelFilterField) {
        vmcpt.model
            .map((item, index) => {
              return child._id === item[vmcpt.modelFilterField] ? index : false;
            })
            .forEach((item) => {
              if (item !== false) {
                vmcpt.model.splice(item, 1);
              }
            });
        delete vmcpt.childrenModel[child._id];
      }
    };

    /**
     * Process all children generating model structures
     * and necessary watches
     */
    const initChildren = () => {
      vmcpt.children = [];
      vmcpt.model = vmcpt.model || (vmcpt.modelFilterField ? [] : {});
      vmcpt.childrenModel = {};
      vmcpt.rawChildren.forEach((rawChild) => {
        pushNewChild(rawChild);
      });
    };

    // Run remove watch function and remove the item from control list
    const deleteWatch = (watchId) => {
      const itemIndex = itemsToDestroy.findIndex((item) => {
        return item._id === watchId;
      });
      if (itemIndex !== -1) {
        itemsToDestroy[itemIndex].item();
        itemsToDestroy.splice(itemIndex, 1);
        deleteWatch(watchId);
      }
    };

    vmcpt.$onInit = function() {
      const loadingId = LoadingSplashService.showLoading(true);
      vmcpt.modelPath = vmcpt.modelPath || '';
      if (
        vmcpt.rawChildren &&
        Array.isArray(vmcpt.rawChildren) &&
        ((vmcpt.modelFilterField && Array.isArray(vmcpt.model)) ||
          ((!vmcpt.modelFilterField && !Array.isArray(vmcpt.model)) ||
            !vmcpt.model))
      ) {
        initChildren();
        const itemToDestroy = $scope.$watchCollection(
            'vmcpt.rawChildren',
            (newValue, oldValue, scope) => {
              if (newValue && oldValue) {
                if (newValue.length > oldValue.length) {
                  const newChild = newValue.find((newItem) => {
                    return !oldValue.some((oldItem) => {
                      return oldItem._id === newItem._id;
                    });
                  });
                  pushNewChild(newChild);
                } else if (oldValue.length > newValue.length) {
                  const deletedChild = oldValue.find((oldItem) => {
                    return !newValue.some((newItem) => {
                      return newItem._id === oldItem._id;
                    });
                  });
                  deleteChild(deletedChild);
                }
              }
            },
        );
        itemsToDestroy.push({
          _id: 'main',
          item: itemToDestroy,
        });
        vmcpt.loaded = true;
      } else {
        vmcpt.loaded = false;
      }
      LoadingSplashService.hideLoading(loadingId);
    };

    vmcpt.$onDestroy = () => {
      while (itemsToDestroy.length > 0) {
        deleteWatch(itemsToDestroy[0]._id);
      }
    };

    vmcpt.getChildOrder = (child) => child.order || child.tempId;
  }
})();
