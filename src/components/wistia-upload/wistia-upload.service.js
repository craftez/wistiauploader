class WistiaUploadService {
  constructor($q, $http, wistiaConst) {
    'ngInject';
    this.$q = $q;
    this.$http = $http;
    this.wistiaConst = wistiaConst;
  }

  getAllVideos() {
    const defer = this.$q.defer();
    this.$http.get(`${this.wistiaConst.baseUrl}medias.json`, {
      params: {
        api_password: this.wistiaConst.apiPassword
      }
    }).then(res => {
      defer.resolve(res.data);
    }, err => {
      defer.reject(err);
    });
    return defer.promise;
  }

  uploadVideo() {

  }

  deleteVideo(id) {
    const defer = this.$q.defer();
    const url = `${this.wistiaConst.baseUrl}medias/${id}.json`;
    this.$http.delete(url, {
      params: {
        api_password: this.wistiaConst.apiPassword
      }
    }).then(response => {
      defer.resolve(response);
    }, (err, status) => {
      defer.reject(err, status);
    });

    return defer.promise;
  }

  getVideo(id) {
    const defer = this.$q.defer();

    this.$http.get(`${this.wistiaConst.baseUrl}medias.json`, {
      params: {
        hashed_id: id,
        api_password: this.wistiaConst.apiPassword
      }
    }).then(response => {
      defer.resolve(response);
    }, (err, status) => {
      defer.reject(err, status);
    });

    return defer.promise;
  }

}

export default WistiaUploadService;
