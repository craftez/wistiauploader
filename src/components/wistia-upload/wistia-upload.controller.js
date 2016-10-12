class WistiaController {
  constructor($timeout, $scope, $sce, $http, wistiaConst) {
    'ngInject';
    this.$timeout = $timeout;
    this.$sce = $sce;
    this.$http = $http;
    this.$scope = $scope;
    this.wistiaConst = wistiaConst;

    this.onInit();
  }

  onInit() {
    this.isUploading = false;
    this.isProcessing = false;
    this.displayFailureMessage = false;
    this.progressPercentual = 0;
    this.progressBarActive = false;

    this.uploadOptions = {
      url: this.wistiaConst.uploadUrl,
      type: 'POST',
      formData: [{
        name: 'api_password',
        value: this.wistiaConst.apiPassword
        }, {
          name: 'project_id',
          value: '5a04w3kf5k'
      }],
      processQueue: [{
        action: 'validate',
        always: true,
        acceptFileTypes: '@'
      }],
      add: (e, data) => { // called when a file is picked
        const file = data.files[0];
        debugger;
        this.displayFailureMessage = false;

        if (file.type.indexOf('video') === -1) {
          this.displayFailureMessage = true;
          // this.$scope.$apply();
          return;
        }

        this.isUploading = true;
        data.submit();
        this.$scope.$apply();
      },
      done: (e, data) => { // called when the uploading is done
        this.isUploading = false;
        debugger;
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
        debugger;
        this.isUploading = false;
        this.failureMessage = 'Something went wrong.';
        this.displayFailureMessage = true;

        this.$scope.$apply();
      },
      progressall: (e, data) => {
        debugger;
        this.progressPercentual = parseInt(data.loaded / data.total * 100, 10);
        this.$scope.$apply();
      }
    };
  }

  retrieveVideoHashWhenReady() {
    const requestConfig = {
      params: {
        hashed_id: this.wistiaVideoHash,
        api_password: this.wistiaConst.apiPassword
      }
    };

    this.isProcessing = true;

    this.$http.get(this.wistiaConst.mediasUrl, requestConfig)
        .then(response => {
          this.isUploading = false;

          if (response.data && response.data[0]) {
            const wistiaInfo = response.data[0];
                // If the video is ready, I can show it.
            if (wistiaInfo.status === 'ready') {
              this.url = this.$sce.trustAsResourceUrl('http://fast.wistia.net/embed/iframe/' + wistiaInfo.hashed_id);
              this.isProcessing = false;

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
            this.failureMessage = 'Something went wrong.';
            this.displayFailureMessage = true;

            this.isProcessing = false;
          }
        }, err => {
          this.failureMessage = 'Something went wrong.';
          this.displayFailureMessage = true;
          this.isUploading = false;
          this.isProcessing = false;
        });
  }
}

export default WistiaController;
