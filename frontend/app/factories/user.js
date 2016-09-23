sgmpApp.factory("User", function ($rootScope, $http, $location){
  var interfaz = {
    data: null,
    CookieName: '3Sb0ttjKzx',
    token: '',
  
    fetch: function(callback) {
      var _this = this;

      this.token = this.getCookie();

      $http.get(appconfig.api + '/auth', {headers: {'Authorization' : this.token}})
        .success(function(data, status, headers, config) {
          _this.data = data;
          if (callback) callback(data);
        })
        .error(function(data, status, headers, config) {
          if (callback) callback(false, data);
        });

      return this;
    },

    login: function (password, callback) {
      var _this = this;
      $http.post(appconfig.api + '/auth', {password : password})
        .success(function(data, status, headers, config) {
          _this.setCookie(data.token);
          if (callback) callback.success();
        })
        .error(function(data, status, headers, config) {
          if (callback) callback.error(data);
        });
    }, 

    logout: function(callback) {
      var _this = this;
      $http.post(appconfig.apiUrl + '/logout')
        .success(function() {
          _this.data = null;
          _this.isLogin = false;
          _this.register = false;
          $location.path('/');
          if (callback) callback();
        });
      return this;
    },

    setCookie: function (token) {
      var d = new Date();
      d.setTime(d.getTime() + (2 * 7 * 24 * 60 * 60));
      var expires = "expires="+d.toGMTString();
      document.cookie = this.CookieName + "="+token+"; " + expires;
      this.token = this.getCookie();
    },

    getCookie: function () {
      var name = this.CookieName + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) {
          return c.substring(name.length,c.length);
        }
      }
      return "";
    }
  }
  return interfaz;
});
