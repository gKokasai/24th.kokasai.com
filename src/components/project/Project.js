import { Pages } from "../Pages";
import "../../css/pageStyle.css";
import "./projectStyle.css";
import projectData from "../../json/projectData.json";

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function Project() {
  //変更前の銀河の番号
  var preGalNum = 1;

  //クエリを取得
  const quely = new URLSearchParams(useLocation().search);
  var grd = parseInt(quely.get("grd")); //初期の星を指定
  if (grd == null) grd = 1;
  if (projectData[grd] == undefined) grd = 1;


  //1度だけ実行
  useEffect(() => {

    let parent = document.getElementById("projectSelectBar");
    for (let i in projectData) {
      if (i == 0) continue;

      let element = document.createElement("button"); //divとかでもいい
      element.classList.add("projectSelectButton");
      if (i == grd) element.classList.add("projectSelectButton_selected");
      element.innerText = projectData[i][0];
      element.addEventListener("click", () => changeGalaxy(i, preGalNum));
      parent.appendChild(element);
    }

    createPlanets(grd); //初期設定:1年生の星を表示

    const planetArea = document.getElementById("planetArea");
    planetArea.style.animationTimingFunction = "ease-out";
    planetArea.style.animationName = "fadeIn";

    setTimeout(() => {
      //ラベルを表示
      let planetGroupName = document.getElementsByClassName("planetGroupName");
      let planetProjectName = document.getElementsByClassName("planetProjectName");
      let planetImage = document.getElementsByClassName("planetImage");
      for (let i = 0; i < planetGroupName.length; i++) {
        //planetGroupName[i].classList.remove("invisible");
        //planetProjectName[i].classList.remove("invisible");
        planetGroupName[i].style.visibility = "visible";
        planetProjectName[i].style.visibility = "visible";
        planetImage[i].style.border = "double 8px #00FFFF";
        setColor(planetImage[i], grd);
      }
    }, 600);

  }, []);


  function changeGalaxy(galNum, preGalNum_local) {
    const planetArea = document.getElementById("planetArea");

    //ラベルを非表示
    let planetGroupName = document.getElementsByClassName("planetGroupName");
    let planetProjectName = document.getElementsByClassName("planetProjectName");
    let planetImage = document.getElementsByClassName("planetImage");
    for (let i = 0; i < planetGroupName.length; i++) {
      //planetGroupName[i].classList.add("invisible");
      //planetProjectName[i].classList.add("invisible");
      planetGroupName[i].style.visibility = "hidden";
      planetProjectName[i].style.visibility = "hidden";
      planetImage[i].style.animationName = "none";
      planetImage[i].style.border = "solid 8px #00000000";
    }

    planetArea.style.animationTimingFunction = "ease-in";
    planetArea.style.animationName = "fadeOut";

    let projectSelectButton = document.getElementsByClassName("projectSelectButton");
    projectSelectButton[preGalNum_local - 1].classList.remove("projectSelectButton_selected");
    projectSelectButton[galNum - 1].classList.add("projectSelectButton_selected");
    preGalNum = galNum;

    setTimeout(() => {
      createPlanets(galNum);

      planetArea.style.animationTimingFunction = "ease-out";
      planetArea.style.animationName = "fadeIn";

    }, 800);

    setTimeout(() => {
      //ラベルを表示
      let planetGroupName = document.getElementsByClassName("planetGroupName");
      let planetProjectName = document.getElementsByClassName("planetProjectName");
      let planetImage = document.getElementsByClassName("planetImage");
      for (let i = 0; i < planetGroupName.length; i++) {
        //planetGroupName[i].classList.remove("invisible");
        //planetProjectName[i].classList.remove("invisible");
        planetGroupName[i].style.visibility = "visible";
        planetProjectName[i].style.visibility = "visible";
        planetImage[i].style.border = "double 8px #FFFFFF";
        setColor(planetImage[i], galNum);
      }
    }, 800 + 600);

  }


  function createPlanets(galNum) {
    const planetArea = document.getElementById("planetArea");

    //既存の星を削除
    const removeTarget = document.getElementsByClassName("planetBox");
    while (removeTarget.length > 0) {
      removeTarget[0].remove();
    }

    //新たな星を作成

    var leftRatio = new Array(galNum);

    for (let i = 1; i < projectData[galNum].length; i++) {
      //planetImage,planetTextはplanetBoxの子要素
      //planetBoxがplanetAreaの子要素になる
      let planetBox = document.createElement("div");
      planetBox.classList.add("planetBox");
      planetBox.classList.add("boxMotion" + i);
      planetBox.style.left = leftRatio[i - 1] + "%";

      let planetImageHref = document.createElement("a");
      const path = Pages.projectDetail.path + "?grd=" + galNum + "&cls=" + i;
      planetImageHref.href = path;

      let planetImage = document.createElement("img");
      //projectDataのパスの最初のドットを削除する<-パスの階層を同じにしたので不要
      //let pathOfData = projectData[galNum][i].imgPath;
      //let imgPath = pathOfData.substr(1);
      //planetImage.src = imgPath;
      planetImage.src = projectData[galNum][i].imgPath;
      planetImage.classList.add("planetImage");
      planetImage.style.animationDelay = parseInt(4000 * i / (projectData[galNum].length - 1)) + "ms";
      planetImage.id = galNum + "-" + i;

      let planetGroupName = document.createElement("p");
      planetGroupName.classList.add("planetGroupName");
      //3年~5年のクラス名は改行する
      planetGroupName.innerHTML = (galNum >= 3 && galNum <= 5) ? projectData[galNum][i].groupName.replace(" ", "<br />") : projectData[galNum][i].groupName;
      //ラベルを非表示
      //planetGroupName.classList.add("invisible");
      planetGroupName.style.visibility = "hidden";

      let planetProjectName = document.createElement("p");
      planetProjectName.classList.add("planetProjectName");
      planetProjectName.innerHTML = projectData[galNum][i].projectName;
      //ラベルを非表示
      //planetProjectName.classList.add("invisible");
      planetProjectName.style.visibility = "hidden";

      planetImageHref.appendChild(planetImage);

      planetBox.appendChild(planetGroupName);
      planetBox.appendChild(planetImageHref);
      planetBox.appendChild(planetProjectName);

      planetArea.appendChild(planetBox);
    }

    //位置を設定
    addRad = 0;
    setPlanets(addRad);
  }

  //borderの色を設定
  function setColor(target, galNum) {

    /*const markColor = [
      "#FF00F7",
      "#00CF0F",
      "#F7A030",
      "#D72070",
      "#FFDF00"
    ];*/

    const markColor = [
      "#FF00F7",
      "#F7FF00",
      "#00F7FF",
      "#00FF5D"
    ];

    /*
      ピンクborder-color: rgb(255, 0, 247);
      みどりborder-color: rgb(0, 207, 25);
      オレンジ-color: rgb(247, 160, 48);
      きいろborder-color: rgb(255, 223, 0);
      赤紫border-color: rgb(215, 32, 112);
    */

    target.style.borderColor = markColor[galNum % 4];

    /*
    if (1 <= galNum && galNum <= 5) {
      target.style.borderColor = markColor[galNum - 1]; //学科の色
    }
    else if (6 <= galNum && galNum <= 8) {
      target.style.borderColor = "#00ffff"; //水色
    }
    else if (9 <= galNum && galNum <= 10) {
      target.style.borderColor = "#ffc0cb"; //ピンク
    }
    else if (11 <= galNum && galNum <= 12) {
      target.style.borderColor = "#00ff00"; //ライム
    }
    else if (galNum == 13) {
      target.style.borderColor = "#8a2be2"; //紫色
    }
    else {
      target.style.borderColor = "#696969"; //灰色
    }*/
    //target.style.borderColor = "#3FFFFF";
  }

  //星の位置を設定
  function setPlanets(addRad) {
    let planetBox = document.getElementsByClassName("planetBox");

    if (planetBox.length == 0) {
      //console.log("no contents");
    }
    else {
      for (let i = 0; i < planetBox.length; i++) {
        const rad = i * 2 * Math.PI / planetBox.length + addRad;

        const boxWidth = (30 + 10 * Math.cos(rad)) * 2;

        planetBox[i].style.left = 50 - boxWidth / 2 + 35 * Math.sin(rad) + "%";
        planetBox[i].style.top = 50 - boxWidth / 2 + 20 * Math.cos(rad) + "%";

        const zVal = parseInt(100 * Math.cos(rad));
        planetBox[i].style.zIndex = 1000 + zVal;

        planetBox[i].style.width = boxWidth + "%";
        planetBox[i].style.height = boxWidth + "%";

        if (zVal > 80) {
          planetBox[i].classList.remove("imgBlur");
        }
        else {
          planetBox[i].classList.add("imgBlur");
        }
      }
    }

  }

  var prePos = { x: 0, y: 0 };
  var addRad = 0; //角度(ラジアン)
  var isMouseDown = 0; //マウスが押されたか
  var scrollBarLeft = 0; //スクロールバーの左からのピクセル数

  //置かれた指の位置を取得(指)
  function setPrePos(e) {
    //e.preventDefault();
    prePos.x = e.touches[0].clientX;
    prePos.y = e.touches[0].clientY;

    setPlanets(addRad);
  }

  //置かれた指の位置を取得(マウス)
  function setPrePos_mouse(e) {
    //e.preventDefault();
    isMouseDown = 1;
    prePos.x = e.clientX;
    prePos.y = e.clientY;

    setPlanets(addRad);
  }

  //スクロールした際の星の移動(指)
  function rotatePlanets(e) {
    e.preventDefault();
    const pos = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };

    addRad += (pos.x - prePos.x) / 100;
    prePos.x = pos.x;
    prePos.y = pos.y;
    setPlanets(addRad);
  }

  //スクロールした際の星の移動(マウス)
  function rotatePlanets_mouse(e) {
    if (isMouseDown == 1) {
      e.preventDefault();
      const pos = {
        x: e.clientX,
        y: e.clientY
      };

      addRad += (pos.x - prePos.x) / 100;
      prePos.x = pos.x;
      prePos.y = pos.y;
      setPlanets(addRad);
    }
  }

  function setEndPos_mosue(e) {
    //e.preventDefault();
    isMouseDown = 0;
  }


  function scrollSelectBar(e) {
    e.preventDefault();
    const zoomRate = e.deltaY * -0.02;
    scrollBarLeft += zoomRate;
    if (scrollBarLeft > 0) {
      scrollBarLeft = 0;
    }
    if (scrollBarLeft < -50) {
      scrollBarLeft = -50;
    }

    let projectSelectButtons = document.getElementsByClassName("projectSelectButton");
    for (let projectSelectButton of projectSelectButtons) {
      projectSelectButton.style.left = scrollBarLeft + "rem";
    }
  }


  //パッシブでない関数を呼び出す
  const circleRef = useRef(null);
  useEffect(() => {
    circleRef.current.addEventListener("touchstart", setPrePos, { passive: false });
    circleRef.current.addEventListener("touchmove", rotatePlanets, { passive: false });
    return (() => {
      circleRef.current.removeEventListener("touchstart", setPrePos);
      circleRef.current.removeEventListener("touchmove", rotatePlanets);
    });
  });

  const circleRef_bar = useRef(null);
  useEffect(() => {
    circleRef_bar.current.addEventListener("wheel", scrollSelectBar, { passive: false });
    return (() => {
      circleRef_bar.current.removeEventListener("wheel", scrollSelectBar);
    });
  });


  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/img/backGround/space.jpg`} className="backGroundImage responsiveWidth" />

      <div className="moitonArea responsiveWidth">
        <div id="projectSelectBar" className="projectSelectBar" ref={circleRef_bar}></div>
        <div id="planetArea" className="planetArea" ref={circleRef} onMouseDown={setPrePos_mouse} onMouseMove={rotatePlanets_mouse} onMouseUp={setEndPos_mosue} onMouseLeave={setEndPos_mosue}></div>
      </div>

      <div className="contents">
        <div className="contents_innerBlock">
        </div>
      </div>
    </>
  );
}

export default Project;