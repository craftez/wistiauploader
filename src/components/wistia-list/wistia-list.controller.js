class WistiaListController {
  constructor(WistiaUploadService) {
    'ngInject';
    this.WistiaUploadService = WistiaUploadService;
  }

  $onInit() {
    this.WistiaUploadService.getAllVideos().then(response => {
      this.videos = response;
    }, err => {
      this.$log.error(err);
    });
  }

  deleteVideo(video) {
    const index = this.videos.findIndex(v => v.id === video.id);
    if(index !== -1) this.videos.splice(index, 1);
  }
}

export default WistiaListController;
