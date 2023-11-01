import { Pages } from "../Pages";
import "../../css/pageStyle.css";
import "../common/commonStyle.css";
import "./mapStyle.css";
import projectData from "../../json/projectData.json";

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function Map() {

  //クエリを取得
  const quely = new URLSearchParams(useLocation().search);
  var grd = parseInt(quely.get("grd"));
  var cls = parseInt(quely.get("cls"));
  var isFocus = 1;
  if (grd == null || cls == null) {
    grd = 1;
    cls = 1;
    isFocus = 0;
  }
  if (grd == 0 || cls == 0) {
    grd = 1;
    cls = 1;
    isFocus = 0;
  }
  if (projectData[grd] == undefined) {
    grd = 1;
    cls = 1;
    isFocus = 0;
  }
  if (projectData[grd][cls] == undefined) {
    grd = 1;
    cls = 1;
    isFocus = 0;
  }


  //初期設定
  var prePos0 = { x: 0, y: 0 }; //指1本目
  var prePos1 = { x: 0, y: 0 }; //指2本目
  var preDis = 0; //指1本目と2本目の距離
  var preMidPos = { x: 0, y: 0 }; //指1本目と2本目の中間の座標
  var mapPos = { x: 0, y: 0 }; //マップの位置
  const mapWidth = 500; //画像によるので読み込めるようにする
  var mapSize = mapWidth;
  var isMouseDown = 0; //マウスが押されたか
  const appearSize = 400; //アイコンの表示/非表示の境目のサイズ[px]
  const zoomLimit = 1500; //ズームの限界
  const focusSize = 1000; //フォーカスした際のマップの初期サイズ
  var mapType = 2; //1:屋外マップ,2:屋内マップ
  const mapTypeName = ["屋外", "屋内"];


  //1度だけ実行
  useEffect(() => {

    createMapObjects();

    //クエリで指定されている場合、その企画をフォーカス
    if (isFocus == 1) {

      mapType = projectData[grd][cls].mapType;

      mapSize = focusSize;

      //%を数字に変換
      let posNoPercent = {
        x: projectData[grd][cls].posLeft.replace(/[^0-9]/g, ''),
        y: projectData[grd][cls].posTop.replace(/[^0-9]/g, '')
      }
      let posNum = {
        x: Number(posNoPercent.x),
        y: Number(posNoPercent.y)
      }

      let mapCanvas = document.getElementById("mapCanvas");
      let widthBorder = mapSize - mapCanvas.clientWidth;

      mapPos.x = mapCanvas.clientWidth / 2 - mapSize * posNum.x / 100;
      if (mapPos.x > 0) mapPos.x = 0;
      else if (mapPos.x < -widthBorder) mapPos.x = -widthBorder;

      mapPos.y = mapCanvas.clientWidth / 2 - mapSize * posNum.y / 100;
      if (mapPos.y > 0) mapPos.y = 0;
      else if (mapPos.y < -widthBorder) mapPos.y = -widthBorder;

    }

    //表示しない方のマップと企画リストを隠す
    if (mapType == 1) {
      let campusMap_2 = document.getElementById("campusMap_2");
      campusMap_2.classList.add("invisible");
      let mapProjectList_2 = document.getElementById("mapProjectList_2");
      mapProjectList_2.style.display = "none";
    }
    if (mapType == 2) {
      let campusMap_1 = document.getElementById("campusMap_1");
      campusMap_1.classList.add("invisible");
      let mapProjectList_1 = document.getElementById("mapProjectList_1");
      mapProjectList_1.style.display = "none";
    }

    //マップの説明を変更する
    let mapTypeDescription = document.getElementById("mapTypeDescription");
    mapTypeDescription.innerText = mapTypeName[mapType - 1] + "マップ";

    let mapProjectTitle = document.getElementById("mapProjectTitle");
    mapProjectTitle.innerText = mapTypeName[mapType - 1] + "企画一覧";

    let mapChangeButton = document.getElementById("mapChangeButton");
    mapChangeButton.innerText = mapTypeName[2 - mapType] + "マップに切り替え";

    //一定の拡大倍率になったら表示
    if (mapSize >= appearSize) {
      let mapObjectBox = document.getElementsByClassName("mapObjectBox");
      let mapObjectImage = document.getElementsByClassName("mapObjectImage");
      for (let i = 0; i < mapObjectBox.length; i++) {
        const ab = mapObjectImage[i].id.split("-");
        if (projectData[ab[0]][ab[1]].mapType == mapType) {
          mapObjectBox[i].classList.remove("invisible");
        }
      }
      let zoomDescription = document.getElementById("zoomDescription");
      zoomDescription.classList.add("invisible");
    }

    setMapPos(mapPos.x, mapPos.y, mapSize);

  }, []);


  //置かれた指の位置を取得(指)
  function setPrePos(e) {
    //e.preventDefault();
    prePos0.x = e.touches[0].clientX;
    prePos0.y = e.touches[0].clientY;

    if (e.touches.length == 2) {
      prePos1.x = e.touches[1].clientX;
      prePos1.y = e.touches[1].clientY;
      preMidPos.x = (prePos0.x + prePos1.x) / 2;
      preMidPos.y = (prePos0.y + prePos1.y) / 2;
      preDis = Math.hypot(prePos1.x - prePos0.x, prePos1.y - prePos0.y); //2本の指の距離
    }
  }
  //クリックされたマウスの位置を取得(マウス)
  function setPrePos_mouse(e) {
    e.preventDefault();
    isMouseDown = 1;
    prePos0.x = e.clientX;
    prePos0.y = e.clientY;
  }

  //マップのスクロール(指)
  function scrollMap(e) {
    e.preventDefault();
    if (e.touches.length == 1) {
      const pos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };

      let mapCanvas = document.getElementById("mapCanvas");
      let widthBorder = mapSize - mapCanvas.clientWidth;

      mapPos.x += pos.x - prePos0.x;
      if (mapPos.x > 0) mapPos.x = 0;
      else if (mapPos.x < -widthBorder) mapPos.x = -widthBorder;
      else prePos0.x = pos.x;

      mapPos.y += pos.y - prePos0.y;
      if (mapPos.y > 0) mapPos.y = 0;
      else if (mapPos.y < -widthBorder) mapPos.y = -widthBorder;
      else prePos0.y = pos.y;

      //mapPos.x += pos.x - prePos0.x;
      //mapPos.y += pos.y - prePos0.y;
      //prePos0.x = pos.x;
      //prePos0.y = pos.y;

      setMapPos(mapPos.x, mapPos.y, mapSize);
    }
    else if (e.touches.length == 2) {

      prePos0.x = e.touches[0].clientX;
      prePos0.y = e.touches[0].clientY;
      prePos1.x = e.touches[1].clientX;
      prePos1.y = e.touches[1].clientY;
      const midPos = {
        x: (prePos0.x + prePos1.x) / 2,
        y: (prePos0.y + prePos1.y) / 2
      }
      let dis = Math.hypot(prePos1.x - prePos0.x, prePos1.y - prePos0.y); //2本の指の距離

      let campusMap = document.getElementById("mapMovingBox"); //画像によるので引数で変えられるようにする
      let campusMapBounds = campusMap.getBoundingClientRect();

      var zoomRate = 2 * (dis - preDis) * mapSize / mapWidth;
      mapSize += zoomRate; //ズームイン・アウト

      if (mapSize > zoomLimit) {
        zoomRate = 0;
        mapSize = zoomLimit;
      }

      //mapPos.x += zoomRate * (campusMapBounds.left - midPos.x) / mapSize;
      //mapPos.y += zoomRate * (campusMapBounds.top - midPos.y) / mapSize;

      preDis = dis;

      let mapCanvas = document.getElementById("mapCanvas");
      let widthBorder = mapSize - mapCanvas.clientWidth;

      let isMapBorder = {
        x: 0, y: 0
      };

      mapPos.x += zoomRate * (campusMapBounds.left - midPos.x) / mapSize;
      if (mapPos.x > 0) {
        mapPos.x = 0;
        isMapBorder.x++;
      }
      if (mapPos.x < -widthBorder) {
        mapPos.x = -widthBorder;
        isMapBorder.x++;
      }

      mapPos.y += zoomRate * (campusMapBounds.top - midPos.y) / mapSize;
      if (mapPos.y > 0) {
        mapPos.y = 0;
        isMapBorder.y++;
      }
      if (mapPos.y < -widthBorder) {
        mapPos.y = -widthBorder;
        isMapBorder.y++;
      }

      if (isMapBorder.x == 2) {
        mapSize = mapCanvas.clientWidth;
        mapPos.x = 0;
      }

      if (isMapBorder.y == 2) {
        mapSize = mapCanvas.clientWidth;
        mapPos.y = 0;
      }

      //2本指での移動

      mapPos.x += midPos.x - preMidPos.x;
      if (mapPos.x > 0) mapPos.x = 0;
      else if (mapPos.x < -widthBorder) mapPos.x = -widthBorder;
      else preMidPos.x = midPos.x;

      mapPos.y += midPos.y - preMidPos.y;
      if (mapPos.y > 0) mapPos.y = 0;
      else if (mapPos.y < -widthBorder) mapPos.y = -widthBorder;
      else preMidPos.y = midPos.y;

      //mapPos.x += midPos.x - preMidPos.x;
      //mapPos.y += midPos.y - preMidPos.y;
      //preMidPos.x = midPos.x;
      //preMidPos.y = midPos.y;

      setMapPos(mapPos.x, mapPos.y, mapSize);

      //一定の拡大倍率になったら表示
      if (mapSize >= appearSize && mapSize - zoomRate < appearSize) {
        let mapObjectBox = document.getElementsByClassName("mapObjectBox");
        let mapObjectImage = document.getElementsByClassName("mapObjectImage");
        for (let i = 0; i < mapObjectBox.length; i++) {
          const ab = mapObjectImage[i].id.split("-");
          if (projectData[ab[0]][ab[1]].mapType == mapType) {
            mapObjectBox[i].classList.remove("invisible");
          }
        }
        let zoomDescription = document.getElementById("zoomDescription");
        zoomDescription.classList.add("invisible");
      }
      else if (mapSize < appearSize && mapSize - zoomRate >= appearSize) {
        let mapObjectBox = document.getElementsByClassName("mapObjectBox");
        for (let i = 0; i < mapObjectBox.length; i++) {
          mapObjectBox[i].classList.add("invisible");
        }
      }
    }
  }
  //マップのスクロール(マウス)
  function scrollMap_mouse(e) {
    e.preventDefault();
    if (isMouseDown == 1) {
      const pos = {
        x: e.clientX,
        y: e.clientY
      };

      let mapCanvas = document.getElementById("mapCanvas");
      let widthBorder = mapSize - mapCanvas.clientWidth;

      mapPos.x += pos.x - prePos0.x;
      if (mapPos.x > 0) mapPos.x = 0;
      else if (mapPos.x < -widthBorder) mapPos.x = -widthBorder;
      else prePos0.x = pos.x;

      mapPos.y += pos.y - prePos0.y;
      if (mapPos.y > 0) mapPos.y = 0;
      else if (mapPos.y < -widthBorder) mapPos.y = -widthBorder;
      else prePos0.y = pos.y;

      //mapPos.x += pos.x - prePos0.x;
      //mapPos.y += pos.y - prePos0.y;
      //prePos0.x = pos.x;
      //prePos0.y = pos.y;

      setMapPos(mapPos.x, mapPos.y, mapSize);
    }
  }
  //マップのズーム(マウス)
  function zoomMap_mouse(e) {
    e.preventDefault();
    const pos = {
      x: e.clientX,
      y: e.clientY
    };

    let campusMap = document.getElementById("mapMovingBox"); //画像によるので引数で変えられるようにする
    let campusMapBounds = campusMap.getBoundingClientRect();

    var zoomRate = e.deltaY * -0.4 * mapSize / mapWidth;
    mapSize += zoomRate; //ズームイン・アウト

    if (mapSize > zoomLimit) {
      zoomRate = 0;
      mapSize = zoomLimit;
    }

    //mapPos.x += zoomRate * (campusMapBounds.left - pos.x) / mapSize;
    //mapPos.y += zoomRate * (campusMapBounds.top - pos.y) / mapSize;

    let mapCanvas = document.getElementById("mapCanvas");
    let widthBorder = mapSize - mapCanvas.clientWidth;

    let isMapBorder = {
      x: 0, y: 0
    };

    mapPos.x += zoomRate * (campusMapBounds.left - pos.x) / mapSize;
    if (mapPos.x > 0) {
      mapPos.x = 0;
      isMapBorder.x++;
    }
    if (mapPos.x < -widthBorder) {
      mapPos.x = -widthBorder;
      isMapBorder.x++;
    }

    mapPos.y += zoomRate * (campusMapBounds.top - pos.y) / mapSize;
    if (mapPos.y > 0) {
      mapPos.y = 0;
      isMapBorder.y++;
    }
    if (mapPos.y < -widthBorder) {
      mapPos.y = -widthBorder;
      isMapBorder.y++;
    }

    if (isMapBorder.x == 2) {
      mapSize = mapCanvas.clientWidth;
      mapPos.x = 0;
    }

    if (isMapBorder.y == 2) {
      mapSize = mapCanvas.clientWidth;
      mapPos.y = 0;
    }

    setMapPos(mapPos.x, mapPos.y, mapSize);

    //一定の拡大倍率になったら表示
    if (mapSize >= appearSize && mapSize - zoomRate < appearSize) {
      let mapObjectBox = document.getElementsByClassName("mapObjectBox");
      let mapObjectImage = document.getElementsByClassName("mapObjectImage");
      for (let i = 0; i < mapObjectBox.length; i++) {
        const ab = mapObjectImage[i].id.split("-");
        if (projectData[ab[0]][ab[1]].mapType == mapType) {
          mapObjectBox[i].classList.remove("invisible");
        }
      }
      let zoomDescription = document.getElementById("zoomDescription");
      zoomDescription.classList.add("invisible");
    }
    else if (mapSize < appearSize && mapSize - zoomRate >= appearSize) {
      let mapObjectBox = document.getElementsByClassName("mapObjectBox");
      for (let i = 0; i < mapObjectBox.length; i++) {
        mapObjectBox[i].classList.add("invisible");
      }
    }
  }

  //マップが瞬間移動しないようにする(指)
  function setEndPos(e) {
    //e.preventDefault();
    if (e.touches.length == 1) {
      prePos0.x = e.touches[0].clientX;
      prePos0.y = e.touches[0].clientY;
    }
  }
  //マウスが押されていない判定にする(マウス)
  function setEndPos_mosue(e) {
    //e.preventDefault();
    isMouseDown = 0;
  }

  //マップの位置,大きさを設定
  function setMapPos(mapPosX, mapPosY, mapSize) {
    let campusMap = document.getElementById("mapMovingBox");
    campusMap.style.width = mapSize + "px";
    campusMap.style.height = mapSize + "px";
    campusMap.style.left = mapPosX + "px";
    campusMap.style.top = mapPosY + "px";
  }


  function createMapObjects() {
    const mapMovingBox = document.getElementById("mapMovingBox");

    //マップ上のアイコンを生成
    for (let i = 1; i < projectData.length; i++) {
      for (let j = 1; j < projectData[i].length; j++) {
        //mapObjectImage,mapObjectTextはmapObjectBoxの子要素
        //mapObjectBoxはmapMovingBoxの子要素になる
        let mapObjectBox = document.createElement("div");
        mapObjectBox.classList.add("mapObjectBox");
        mapObjectBox.classList.add("invisible");
        mapObjectBox.style.top = projectData[i][j].posTop;
        mapObjectBox.style.left = projectData[i][j].posLeft;

        let mapObjectImage = document.createElement("input");
        mapObjectImage.type = "image";
        //mapObjectImage.src = `${process.env.PUBLIC_URL}/img/map/tipIcon.png`;
        mapObjectImage.src = projectData[i][j].imgPath;
        mapObjectImage.classList.add("mapObjectImage");
        mapObjectImage.onclick = toProjectDetail;
        mapObjectImage.id = i + "-" + j;

        let mapObjectText = document.createElement("p");
        mapObjectText.classList.add("mapObjectText");
        mapObjectText.innerText = projectData[i][j].groupName;


        mapObjectBox.appendChild(mapObjectImage);
        //mapObjectBox.appendChild(mapObjectText);

        mapMovingBox.appendChild(mapObjectBox);
      }
    }
  }


  //マップを切り替える
  function changeMap() {
    mapType = (mapType == 1) ? 2 : 1;
    mapPos.x = 0;
    mapPos.y = 0;
    mapSize = mapWidth;

    //マップと企画リストを非表示にする
    let campusMap_1 = document.getElementById("campusMap_1");
    let campusMap_2 = document.getElementById("campusMap_2");
    let mapProjectList_1 = document.getElementById("mapProjectList_1");
    let mapProjectList_2 = document.getElementById("mapProjectList_2");

    if (mapType == 1) {
      campusMap_1.classList.remove("invisible");
      campusMap_2.classList.add("invisible");

      mapProjectList_1.style.display = "block";
      mapProjectList_2.style.display = "none";
    }
    if (mapType == 2) {
      campusMap_1.classList.add("invisible");
      campusMap_2.classList.remove("invisible");

      mapProjectList_1.style.display = "none";
      mapProjectList_2.style.display = "block";
    }

    //マップの説明を変更する
    let mapTypeDescription = document.getElementById("mapTypeDescription");
    mapTypeDescription.innerText = mapTypeName[mapType - 1] + "マップ";

    let mapProjectTitle = document.getElementById("mapProjectTitle");
    mapProjectTitle.innerText = mapTypeName[mapType - 1] + "企画一覧";

    let mapChangeButton = document.getElementById("mapChangeButton");
    mapChangeButton.innerText = mapTypeName[2 - mapType] + "マップに切り替え";


    //アイコンを非表示にする
    let mapObjectBox = document.getElementsByClassName("mapObjectBox");
    for (let i = 0; i < mapObjectBox.length; i++) {
      mapObjectBox[i].classList.add("invisible");
    }

    setMapPos(mapPos.x, mapPos.y, mapSize);

  }


  //パッシブでない関数を呼び出す
  const circleRef = useRef(null);
  useEffect(() => {
    circleRef.current.addEventListener("touchstart", setPrePos, { passive: false });
    circleRef.current.addEventListener("touchmove", scrollMap, { passive: false });
    circleRef.current.addEventListener("touchend", setEndPos, { passive: false });

    circleRef.current.addEventListener("wheel", zoomMap_mouse, { passive: false });
    return (() => {
      circleRef.current.removeEventListener("touchstart", setPrePos);
      circleRef.current.removeEventListener("touchmove", scrollMap);
      circleRef.current.removeEventListener("touchend", setEndPos);

      circleRef.current.removeEventListener("wheel", zoomMap_mouse);
    });
  });


  //企画詳細ページに移動
  function toProjectDetail() {
    const ab = this.id.split("-");
    window.location.assign(Pages.projectDetail.path + "?grd=" + ab[0] + "&cls=" + ab[1]);
  }



  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/img/backGround/antique.jpg`} className="backGroundImage responsiveWidth" />

      <div id="mapCanvas" className="mapCanvas" ref={circleRef} onMouseDown={setPrePos_mouse} onMouseMove={scrollMap_mouse} onMouseUp={setEndPos_mosue} onMouseLeave={setEndPos_mosue}>
        <div id="mapMovingBox" className="mapMovingBox">
          <img id="mapBackImg" className="mapBackImg" src={`${process.env.PUBLIC_URL}/img/map/mapBack.jpg`} />

          <img id="campusMap_1" className="campusMap_1" src={`${process.env.PUBLIC_URL}/img/map/campusMap_1.svg`} />
          <img id="campusMap_2" className="campusMap_2" src={`${process.env.PUBLIC_URL}/img/map/campusMap_2.svg`} />

        </div>

        <div id="mapTypeDescription" className="mapTypeDescription"></div>
        <div id="zoomDescription" className="zoomDescription">マップを拡大すると各企画が表示されます</div>

      </div>

      <div onClick={changeMap} id="mapChangeButton" className="mapChangeButton" >あいうえお</div>

      <div className="contents">
        <div className="contents_innerBlock">

          <div className="mapProjectList">
            <p id="mapProjectTitle" className="heading2"></p>

            <ul id="mapProjectList_1" className="ul_map">
              <li>構造デザイン研究会</li>
              <li>バレーボール部</li>
              <li>自転車愛好会</li>
              <li>サッカー部</li>
              <li>ロボット研究会</li>
              <li>5年 環境都市工学科</li>
              <li>ラグビー愛好会</li>
              <li>理科部</li>
              <li>学生会執行部</li>
              <li>クイズ研究会</li>
              <li>3年 環境都市工学科</li>
              <li>3Dデザイン研究会</li>
              <li>4年 電子メディア工学科</li>
              <li>SF研究部</li>
              <li>4年 機械工学科</li>
              <li>4年 環境都市工学科</li>
              <li>バスケットボール部</li>
              <li>コンクリートカヌー愛好会</li>
              <li>テニス部</li>
              <li>2年 3組</li>
              <li>剣道部</li>
              <li>陸上競技部</li>
              <li>エコノパワー愛好会</li>
              <li>1年 1組</li>
              <li>バドミントン部</li>
              <li>卓球部</li>
              <li>硬式野球部</li>
              <li>ソフトテニス部</li>
              <li>水泳部</li>
              <li>3年 電子情報工学科</li>
              <li>柔道部</li>
              <li>茶道部</li>
            </ul>

            <ul id="mapProjectList_2" className="ul_map">
              <li>将棋部</li>
              <li>4年 物質工学科</li>
              <li>1年 3組</li>
              <li>1年 4組</li>
              <li>1年 5組</li>
              <li>2年 5組</li>
              <li>2年 2組</li>
              <li>無線通信愛好会</li>
              <li>3年 物質工学科</li>
              <li>5年 電子メディア工学科</li>
              <li>5年 機械工学科</li>
              <li>3年 電子メディア工学科</li>
              <li>4年 電子情報工学科</li>
              <li>3年 機械工学科</li>
              <li>2年 4組</li>
              <li>文芸部</li>
              <li>入試広報ブース</li>
              <li>5年 電子情報工学科</li>
              <li>2年 1組</li>
              <li>1年 2組</li>
              <li>有志（ミラクル★ライド）</li>
              <li>吹奏楽部</li>
              <li>写真部</li>
              <li>5年 物質工学科</li>
              <li>演劇部</li>
              <li>有志（M科工房～ウッドバーニング体験～）</li>
              <li>有志（ガチャガチャジャングル）</li>
            </ul>
          </div>

        </div>
      </div>
    </>
  );
}

export default Map;