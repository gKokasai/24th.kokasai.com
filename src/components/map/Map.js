import { Pages } from "../Pages";
import "../../css/pageStyle.css";
import "../common/commonStyle.css";
import "./mapStyle.css";
import projectData from "../../json/projectData.json";

import { useEffect, useRef } from "react";

function Map() {
  var prePos0 = { x: 0, y: 0 }; //指1本目
  var prePos1 = { x: 0, y: 0 }; //指2本目
  var preDis = 0; //指1本目と2本目の距離
  var preMidPos = { x: 0, y: 0 }; //指1本目と2本目の中間の座標
  var mapPos = { x: 0, y: 0 };
  const mapWidth = 500; //画像によるので読み込めるようにする
  var mapSize = mapWidth;
  var isMouseDown = 0; //マウスが押されたか
  const appearSize = 800; //アイコンの表示/非表示の境目のサイズ[px]

  //1度だけ実行
  useEffect(() => {

    createMapObjects();

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

      mapPos.x += pos.x - prePos0.x;
      mapPos.y += pos.y - prePos0.y;

      prePos0.x = pos.x;
      prePos0.y = pos.y;

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

      const zoomRate = 2 * (dis - preDis) * mapSize / mapWidth;
      mapSize += zoomRate; //ズームイン・アウト

      mapPos.x += zoomRate * (campusMapBounds.left - midPos.x) / mapSize;
      mapPos.y += zoomRate * (campusMapBounds.top - midPos.y) / mapSize;

      preDis = dis;

      //2本指での移動
      mapPos.x += midPos.x - preMidPos.x;
      mapPos.y += midPos.y - preMidPos.y;
      preMidPos.x = midPos.x;
      preMidPos.y = midPos.y;

      setMapPos(mapPos.x, mapPos.y, mapSize);

      //一定の拡大倍率になったら表示
      if (mapSize >= 800 && mapSize - zoomRate < 800) {
        let mapObjectBox = document.getElementsByClassName("mapObjectBox");
        for (let i = 0; i < mapObjectBox.length; i++) {
          mapObjectBox[i].classList.remove("invisible");
        }
      }
      else if (mapSize < 800 && mapSize - zoomRate >= 800) {
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

      let widthBorder=mapWidth*(1+mapSize/mapWidth);
      console.log(widthBorder);

      mapPos.x += pos.x - prePos0.x;
      if (mapPos.x > 0) mapPos.x = 0;
      else if(mapPos.x < -widthBorder) mapPos.x = -widthBorder;
      else prePos0.x = pos.x;

      mapPos.y += pos.y - prePos0.y;
      if (mapPos.y > 0) mapPos.y = 0;
      else if(mapPos.y < -widthBorder) mapPos.y = -widthBorder;
      else prePos0.y = pos.y;

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

    const zoomRate = e.deltaY * -0.4 * mapSize / mapWidth;
    mapSize += zoomRate; //ズームイン・アウト

    mapPos.x += zoomRate * (campusMapBounds.left - pos.x) / mapSize;
    mapPos.y += zoomRate * (campusMapBounds.top - pos.y) / mapSize;

    setMapPos(mapPos.x, mapPos.y, mapSize);

    //一定の拡大倍率になったら表示
    if (mapSize >= appearSize && mapSize - zoomRate < appearSize) {
      let mapObjectBox = document.getElementsByClassName("mapObjectBox");
      for (let i = 0; i < mapObjectBox.length; i++) {
        mapObjectBox[i].classList.remove("invisible");
      }
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
        mapObjectImage.src = `${process.env.PUBLIC_URL}/img/map/tipIcon.png`;
        mapObjectImage.classList.add("mapObjectImage");
        mapObjectImage.onclick = toProjectDetail;
        mapObjectImage.id = i + "-" + j;

        let mapObjectText = document.createElement("p");
        mapObjectText.classList.add("mapObjectText");
        mapObjectText.innerText = projectData[i][j].groupName;

        mapObjectBox.appendChild(mapObjectImage);
        mapObjectBox.appendChild(mapObjectText);

        mapMovingBox.appendChild(mapObjectBox);
      }
    }

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
    window.location.assign(Pages.projectDetail.path + "?a=" + ab[0] + "&b=" + ab[1]);
  }


  return (
    <>
      <div id="mapCanvas" className="mapCanvas" ref={circleRef} onMouseDown={setPrePos_mouse} onMouseMove={scrollMap_mouse} onMouseUp={setEndPos_mosue} onMouseLeave={setEndPos_mosue}>
        <div id="mapMovingBox" className="mapMovingBox">
          <img id="mapBackImg" className="mapBackImg" src={`${process.env.PUBLIC_URL}/img/map/mapBack.jpg`} />
          <img id="campusMap_1" className="campusMap_1" src={`${process.env.PUBLIC_URL}/img/map/campusMap_1.svg`} />
        </div>
      </div>

      <img src={`${process.env.PUBLIC_URL}/img/backGround/antique.jpg`} className="backGroundImage responsiveWidth" />
      <div className="contents">
        <div className="contents_innerBlock">
          <br />
          <p>あいうえお</p><br />
          <p>かきくけこ</p><br />
          <p>さしすせそ</p><br />
          <p>たちつてと</p><br />
          <p>なにぬねの</p><br />
          <p>はひふへほ</p><br />
          <p>まみむめも</p><br />
          <p>やゆよ</p><br />
          <p>らりるれろ</p><br />
          <p>わをん</p>
        </div>

      </div>
    </>
  );
}

export default Map;