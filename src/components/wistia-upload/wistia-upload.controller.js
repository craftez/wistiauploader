class WistiaController {
  constructor($timeout, $scope, $log, $http, wistiaConst, WistiaUploadService) {
    'ngInject';
    this.$timeout = $timeout;
    this.$log = $log;
    this.$http = $http;
    this.$scope = $scope;
    this.wistiaConst = wistiaConst;
    this.WistiaUploadService = WistiaUploadService;
    this.onInit();
  }

  onInit() {
    this.showUploader = true;
    this.isUploading = false;
    this.isProcessing = false;
    this.displayFailureMessage = false;

    // progress bar component settings
    this.progressPercentual = 0;
    this.progressBarStyle = '';
    this.progressBarMessage = '';

    this.uploadOptions = {
      url: this.wistiaConst.uploadUrl,
      type: 'POST',
      formData: [{
        name: 'api_password',
        value: this.wistiaConst.apiPassword
      }, {
        name: 'project_id',
        value: this.wistiaConst.projectId
      }],
      processQueue: [{
        action: 'validate',
        always: true,
        acceptFileTypes: '@'
      }],
      add: (e, data) => { // called when a file is picked

        const file = data.files[0];
        this.displayFailureMessage = false;

        if (file.type.indexOf('video') === -1) {
          this.displayFailureMessage = true;
          this.$scope.$apply();
          return;
        }
        this.showUploader = false;
        this.progressBarStyle = 'success';
        this.isUploading = true;
        data.submit();
        this.$scope.$apply();
      },
      done: (e, data) => { // called when the uploading is done

        this.isUploading = false;
        this.progressBarStyle = '';
        if (data && data.result) {
          this.wistiaVideoHash = data.result.hashed_id;
          // retrive the video to show in the embed area
          this.retrieveVideoHashWhenReady();
        } else {
          this.failureMessage = 'Something went wrong, we couldn\'t upload the video';
          this.displayFailureMessage = true;
        }
        this.$scope.$apply();
      },
      fail: () => { // called when the uploading fails

        this.isUploading = false;
        this.failureMessage = 'Something went wrong.';
        this.displayFailureMessage = true;
        this.$scope.$apply();
      },
      progressall: (e, data) => {

        this.progressPercentual = parseInt(data.loaded / data.total * 100, 10);
        this.$scope.$apply();
      }
    };
  }

  retrieveVideoHashWhenReady() {
    const defaultErrorMessage = 'Something went wrong';
    this.isProcessing = true;
    this.progressBarMessage = 'Wait, processing...';
    this.WistiaUploadService.getVideo(this.wistiaVideoHash)
        .then(response => {
          this.isUploading = false;
          if (response.data && response.data[0]) {
            const wistiaInfo = response.data[0];
                // If the video is ready, I can show it.
            if (wistiaInfo.status === 'ready') {
              this.uploadedVideo = wistiaInfo;
              this.isProcessing = false;
              this.progressPercentual = 0;
              this.progressBarMessage = '';
            } else if (wistiaInfo.status === 'failed') { // if the status is 'failed', stop the requests, something went wrong
              this.failureMessage = 'Something went wrong while processing the video.';
              this.displayFailureMessage = true;
              this.isProcessing = false;
            } else { // the video can be "processing", "queued"
              this.$timeout(() => {
                this.retrieveVideoHashWhenReady();
              }, 5000);
            }

          } else {
            this.failureMessage = defaultErrorMessage;
            this.displayFailureMessage = true;
            this.isProcessing = false;
          }
        }, err => {
          this.failureMessage = defaultErrorMessage;
          this.displayFailureMessage = true;
          this.isUploading = false;
          this.isProcessing = false;
        });
  }

  deleteVideo() {
    this.uploadedVideo = null;
    this.showUploader = true;
  }

}

export default WistiaController;
