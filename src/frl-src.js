directives.push({
  name: 'frlSrc',
  /**
   * @param {Object} FarolSDK Service
   * @return {Object} Directive object
   * @ngInject
   * */
  method: (FarolSDK) => {
    return {
      link: (scope, element, attrs) => {
        // Check if frlSrc attribute is an array and if not convert it
        const paramsList = attrs.frlSrc.split(';');

        let itemIndex = 0;
        // Optional parameters, if does not exists uses png as extension
        const extension = attrs.frlSrcExt || 'png';

        // Determined if the directive element was destroyd
        let destroyed = false;

        // create watch to reload image
        let reloadAttribute = attrs.frlReload;
        if (reloadAttribute !== undefined) {
          scope.$watch(reloadAttribute, (newValue, oldValue) => {
            if (newValue === true) {
              reloadAttribute = false;
              requestImage();
            }
          });
        }

        const handler = (status, response) => {
          // Prevent multi level download if screen was destroyed
          if (destroyed) {
            return;
          }
          if (status === 200) {
            const arr = new Uint8Array(response);
            let raw = '';
            let i;
            let j;
            let subArray;
            const chunk = 5000;
            for (i = 0, j = arr.length; i < j; i += chunk) {
              subArray = arr.subarray(i, i + chunk);
              raw += String.fromCharCode.apply(null, subArray);
            }
            const b64 = btoa(raw);
            attrs.$set('src', 'data:image/' + extension + ';base64,' + b64);
          } else if (status === 404 && itemIndex < paramsList.length - 1) {
            itemIndex++;
            requestImage();
          }
        };

        const requestImage = () => {
          // Mandatory params
          const params = paramsList[itemIndex].split(',');
          const downloadParams = {
            format: extension,
          };
          // If no authorization is defined than try to download using the
          // public download method
          const fileSDK = new FarolSDK.Admin.File();
          if (FarolSDK.authorization) {
            fileSDK.download(
                params[0],
                params[1],
                params[2],
                downloadParams,
                handler
            );
          } else {
            fileSDK.publicDownload(
                params[0],
                params[1],
                downloadParams,
                handler
            );
          }
        };
        requestImage();

        if (typeof scope.$on === 'function') {
          scope.$on('$destroy', () => (destroyed = true));
        }
      },
      restrict: 'A',
    };
  },
});
