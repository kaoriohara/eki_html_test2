
var map; // マップ

function initialize() {
  var currentPos = new google.maps.LatLng(35.681735, 139.762651); /*現在地*/
  var stationPos = new google.maps.LatLng(35.681622, 139.766073); /*駅*/

  var myOptions = {
    zoom: 15, /*拡大比率*/
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
  
  /*駅ココ表示設定*/
    var markerOptions = {
    position: stationPos,
    map: map,
    icon: iconEkikoko,
    title: ' 駅'
  };
  var markerEkikoko = new google.maps.Marker(markerOptions);
  
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
    "stylers": [
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
}
google.maps.event.addDomListener(window, 'load', initialize);

  function clickMap(event) {
   heartrailsURL = "http://express.heartrails.com/api/json?method=getStations&";
   heartrailsURL += "x=" + event.latLng.lng() + "&";
   heartrailsURL += "y=" + event.latLng.lat() + "&";
   heartrailsURL += "jsonp=getStation";//JSONPのコールバック関数
   var script = document.createElement('script');
   script.src = heartrailsURL;
   document.body.appendChild(script);
  }
   
  //コールバック関数
  function getStation(result) {
   var resultStr = "";
   for(i = 0; i < result["response"]["station"].length; i++) {
    resultStr += result["response"]["station"][i].line + " ";
    resultStr += result["response"]["station"][i].name;
    resultStr += "駅までの距離：" + result["response"]["station"][i].distance + "\n";
   }
   alert(resultStr);
  }

