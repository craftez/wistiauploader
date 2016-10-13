class WistiaPlayerController {
  constructor($log, WistiaUploadService) {
    'ngInject';
    this.$log = $log;
    this.WistiaUploadService = WistiaUploadService;
  }

  deleteVideo() {
    this.WistiaUploadService.deleteVideo(this.video.hashed_id).then(res => {
      if(this.onDelete) this.onDelete({video: this.video});
    }, err => {
      this.$log.error(err);
    });
  }
}

export default WistiaPlayerController;
