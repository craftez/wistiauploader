import template from './wistia-upload.html';

const wistiaUploadDirective = ($timeout, $sce, $http, wistiaConst) => {
  return {
    restrict: 'E',
    template,
    replace: true,
    controller: function($scope) {
      $scope.isUploading = false;
      $scope.isProcessing = false;
      $scope.displayFailureMessage = false;
      $scope.progressPercentual = 0;
      $scope.progressBarActive = false;

      var retrieveVideoHashWhenReady = function() {
        var requestConfig = {
          params: {
            hashed_id: $scope.wistiaVideoHash,
            api_password: wistiaConst.apiPassword
          }
        };

        $scope.isProcessing = true;

        $http.get(wistiaConst.mediasUrl, requestConfig)
                .then(function(response) {
                  $scope.isUploading = false;

                  if (response.data && response.data[0]) {
                    var wistiaInfo = response.data[0];
                        // If the video is ready, I can show it.
                    if (wistiaInfo.status === 'ready') {
                      $scope.url = $sce.trustAsResourceUrl('http://fast.wistia.net/embed/iframe/' + wistiaInfo.hashed_id);
                      $scope.isProcessing = false;

                    } else if (wistiaInfo.status === 'failed') { // if the status is 'failed', stop the requests, something went wrong
                      $scope.failureMessage = 'Something went wrong while processing the video.';
                      $scope.displayFailureMessage = true;
                      $scope.isProcessing = false;
                    } else { // the video can be "processing", "queued"
                      $timeout(function () {
                        retrieveVideoHashWhenReady();
                      }, 5000);
                    }

                  } else {
                    $scope.failureMessage = 'Something went wrong.';
                    $scope.displayFailureMessage = true;

                    $scope.isProcessing = false;
                  }
                }, function(response) {
                  $scope.failureMessage = 'Something went wrong.';
                  $scope.displayFailureMessage = true;
                  $scope.isUploading = false;
                  $scope.isProcessing = false;
                });
      };


      $scope.uploadOptions = {
        url: wistiaConst.uploadUrl,
        type: 'POST',
        formData: [{
          name: 'api_password',
          value: wistiaConst.apiPassword
        }, {
          name: 'project_id',
          value: '5a04w3kf5k'
        }],
        processQueue: [{
          action: 'validate',
          always: true,
          acceptFileTypes: '@'
        }],
        add: function(e, data) { // called when a file is picked
          var file = data.files[0];
          $scope.displayFailureMessage = false;

          if (file.type.indexOf('video') === -1) {
            $scope.displayFailureMessage = true;
            $scope.$apply();
            return;
          }

          $scope.isUploading = true;
          data.submit();
          $scope.$apply();
        },
        done: function(e, data) { // called when the uploading is done
          $scope.isUploading = false;

          if (data && data.result) {
            $scope.wistiaVideoHash = data.result.hashed_id;
                    // retrive the video to show in the embed area
            retrieveVideoHashWhenReady();

          } else {
            $scope.failureMessage = 'Something went wrong, we couldn\'t upload the video';
            $scope.displayFailureMessage = true;
          }

          $scope.$apply();
        },
        fail: function() { // called when the uploading fails
          $scope.isUploading = false;
          $scope.failureMessage = 'Something went wrong.';
          $scope.displayFailureMessage = true;

          $scope.$apply();
        },
        progressall: function (e, data) {
          $scope.progressPercentual = parseInt(data.loaded / data.total * 100, 10);
          $scope.$apply();
        }
      };
    },
    link: function(scope, element, attrs, controller) {
      $(element.find('#fileupload')).fileupload(scope.uploadOptions);
    },
    scope: {
      id: '@',
      pwd: '@wistiapass'
    }
  };
};

export default wistiaUploadDirective;
