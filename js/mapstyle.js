
var map; // マップ
var message;

  // 位置情報を取得します。
  function getLocation(){
    document.getElementById("map_canvas")
    .innerHTML = '<img src="img/gif-load.gif" alt="">';
      if (navigator.geolocation) {
          // 現在の位置情報取得を実施 正常に位置情報が取得できると、
          // successCallbackでコールバック。
          navigator.geolocation.getCurrentPosition
           (successCallback,errorCallback);
      } else {
            message = "本ブラウザではGeolocationが使えません";
            document.getElementById("map_canvas")
            .innerHTML= message;
      }
  }
   // 位置情報が正常に取得されたら
   function successCallback(pos) {
      var pos_array = new Array();

      var potitionLatitude = pos.coords.latitude;
      var potitionLongitude = pos.coords.longitude;

      // Google Mapを表示する
      var currentPos = new google.maps.LatLng(potitionLatitude, potitionLongitude); /*現在地*/

      var url = "http://express.heartrails.com/api/json?method=getStations";
      $.ajax({
        url: url,
        type:'post',
            data: {'x': potitionLongitude,'y': potitionLatitude},
            dataType: 'jsonp',
            crossDomain: true,
        }).done(function(data){ //ajaxの通信に成功した場合
          console.log(data);
          pos_array = data.response.station;
        // var stationPos = new google.maps.LatLng(this.x, this.y); /*駅*/
        $.each(data.response.station, 
          function(i,o){
            console.log(o);
            var stationpos = {lat: o.y, lng: o.x};
              /*駅ココ表示設定*/
              var markerOptions = {
                position: stationpos,
                map: map,
                icon: iconEkikoko,
                title: ' 駅'
              };
              var markerEkikoko = new google.maps.Marker(markerOptions);
          });
      }).fail(function(data){ //ajaxの通信に失敗した場合
        alert("error!");
      });
      // });

      var myOptions = {
        zoom: 16, /*拡大比率*/
        center: currentPos, /*表示枠内の中心点*/
        mapTypeControlOptions: { mapTypeIds: ['sample', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
      };
      var map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

      /*アイコン設定(今ココ)*/
      var iconImakoko = new google.maps.MarkerImage('img/ico.png',
        new google.maps.Size(55,72), /*アイコンサイズ設定*/
        new google.maps.Point(0,0) /*アイコン位置設定*/
        );
      
      /*アイコン設定(駅ココ)*/
      var iconEkikoko = new google.maps.MarkerImage('img/ico01.png',
        new google.maps.Size(55,72), /*アイコンサイズ設定*/
        new google.maps.Point(0,0) /*アイコン位置設定*/
        );
      
      /*今ココ表示設定*/
        var markerOptions = {
        position: currentPos,
        map: map,
        icon: iconImakoko,
        title: ' 現在地'
      };
      
      var markerImakoko = new google.maps.Marker(markerOptions);

      /*範囲描画*/
      new google.maps.Circle({
      center: currentPos,       // 中心点(google.maps.LatLng)
      fillColor: '#BAE3F9',   // 塗りつぶし色
      fillOpacity: 0.3,       // 塗りつぶし透過度（0: 透明 ⇔ 1:不透明）
      map: map,             // 表示させる地図（google.maps.Map）
      radius: 500,          // 半径（ｍ）
      strokeColor: '#7ECEF4', // 外周色 
      strokeOpacity: 1,       // 外周透過度（0: 透明 ⇔ 1:不透明）
      strokeWeight: 1         // 外周太さ（ピクセル）
      });
      /*範囲描画ここまで*/
      
      /*取得スタイルの貼り付け*/
      var styleOptions = [
      {
        "stylers": 
        [
        { "saturation": -100 },
        { "visibility": "simplified" },
        { "lightness": 22 }
        ]
      }
      ];
      var styledMapOptions = { name: ' ' }
      var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
      map.mapTypes.set('sample', sampleType);
      map.setMapTypeId('sample');

      google.maps.event.addListener(marker, 'click', function(event){clickEventFunc(event , pos_array);});
    }

  function errorCallback(error) {
    message = "位置情報が許可されていません";
   document.getElementById("map_canvas").innerHTML = message;
  }

function clickEventFunc(event , pos_array) {
      alert(event.latLng.toString());
    }

function plotMarker(markers){
    for(var idx=0; idx < marker.length; idx++){
        marker.setMap(map);
        onMarkerClick(marker, idx);
    }
}

function onMarkerClick(marker, idx){
    google.maps.event.addListener(
        marker
    ,   'click'
    ,   function(event){
            alert(idx);
        }
    );
}


