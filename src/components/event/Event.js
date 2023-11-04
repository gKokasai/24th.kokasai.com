import "../../css/pageStyle.css";
import "./eventStyle.css";

import eventData from "../../json/eventData.json";

import { useEffect } from "react";

function Event() {
  var day = 1; //何日目

  //1度だけ実行
  useEffect(() => {

    let groupHeading = document.getElementById("groupHeading");
    groupHeading.innerText = eventData[day][0] + "グループ一覧";

    const timeScheduleArea_day1 = document.getElementById("timeScheduleArea_day1");
    const timeScheduleArea_day2 = document.getElementById("timeScheduleArea_day2");
    const bandCCArea = document.getElementById("bandCCArea");
    //const danceCCArea = document.getElementById("danceCCArea");

    createTSContent(timeScheduleArea_day1, 1);
    createTSContent(timeScheduleArea_day2, 2);
    createDanceCCContent(bandCCArea);
    createBandCCContent(bandCCArea);

  }, []);

  function createDanceCCContent(parent) {
    for (let i in eventData[day]) {
      if (i == 0) continue;
      if (eventData[day][i].projectType != "有志ダンス" && eventData[day][i].projectType != "ダンス愛好会") continue;
      let danceCCContent = document.createElement("div");
      danceCCContent.className = "danceCCContent";

      let danceCCdescriptionArea = document.createElement("div");
      danceCCdescriptionArea.className = "danceCCdescriptionArea";
      let danceCCGroupName = document.createElement("div");
      danceCCGroupName.className = "danceCCGroupName";
      danceCCGroupName.innerText = eventData[day][i].groupName;

      let danceCCImageArea = document.createElement("div");
      danceCCImageArea.className = "danceCCImageArea";
      let danceCCGroupImage = document.createElement("img");
      danceCCGroupImage.className = "danceCCGroupImage";
      danceCCGroupImage.src = eventData[day][i].imgPath;

      danceCCdescriptionArea.appendChild(danceCCGroupName);
      if (eventData[day][i].SNSPath != "") {
        let danceCCsnsPath = document.createElement("a");
        danceCCsnsPath.href = eventData[day][i].SNSPath;
        danceCCsnsPath.target = "_blank";
        danceCCsnsPath.rel = "noreferrer noopener";
        let danceCCsnsIcon = document.createElement("img");
        danceCCsnsIcon.className = "danceCCsnsIcon";
        danceCCsnsIcon.src = `${process.env.PUBLIC_URL}/img/snsIcon/instagramIcon.svg`;

        danceCCsnsPath.appendChild(danceCCsnsIcon);
        danceCCdescriptionArea.appendChild(danceCCsnsPath);
      }

      danceCCImageArea.appendChild(danceCCGroupImage);

      danceCCContent.appendChild(danceCCImageArea);
      danceCCContent.appendChild(danceCCdescriptionArea);

      parent.appendChild(danceCCContent);
    }
  }

  function createBandCCContent(parent) {
    for (let i in eventData[day]) {
      if (i == 0) continue;
      if (eventData[day][i].projectType != "バンド") continue;
      let bandCCContent = document.createElement("div");
      bandCCContent.className = "bandCCContent";

      let bandCCdescriptionArea = document.createElement("div");
      bandCCdescriptionArea.className = "bandCCdescriptionArea";
      let bandCCGroupName = document.createElement("div");
      bandCCGroupName.className = "bandCCGroupName";
      bandCCGroupName.innerText = eventData[day][i].groupName;

      let bandCCImageArea = document.createElement("div");
      bandCCImageArea.className = "bandCCImageArea";
      let bandCCGroupImage = document.createElement("img");
      bandCCGroupImage.className = "bandCCGroupImage";
      bandCCGroupImage.src = eventData[day][i].imgPath;

      bandCCdescriptionArea.appendChild(bandCCGroupName);
      if (eventData[day][i].SNSPath != "") {
        let bandCCsnsPath = document.createElement("a");
        bandCCsnsPath.href = eventData[day][i].SNSPath;
        bandCCsnsPath.target = "_blank";
        bandCCsnsPath.rel = "noreferrer noopener";
        let bandCCsnsIcon = document.createElement("img");
        bandCCsnsIcon.className = "bandCCsnsIcon";
        bandCCsnsIcon.src = `${process.env.PUBLIC_URL}/img/snsIcon/instagramIcon.svg`;

        bandCCsnsPath.appendChild(bandCCsnsIcon);
        bandCCdescriptionArea.appendChild(bandCCsnsPath);
      }

      bandCCImageArea.appendChild(bandCCGroupImage);

      bandCCContent.appendChild(bandCCImageArea);
      bandCCContent.appendChild(bandCCdescriptionArea);

      parent.appendChild(bandCCContent);
    }
  }

  function createTSContent(parent, day) {
    for (let i in eventData[day]) {
      if (i == 0) continue;
      let TSContent = document.createElement("div");
      TSContent.className = "TSContent";
      if(eventData[day][i].projectType == "バンド")TSContent.style.backgroundColor="#69B5D1BF";//1DFDCB7F,13F3BF3F
      if(eventData[day][i].projectType == "ダンス愛好会")TSContent.style.backgroundColor="#D169B5BF";//6EFF977F,FD1D9A7F
      if(eventData[day][i].projectType == "有志ダンス")TSContent.style.backgroundColor="#D169B5BF";
      if(eventData[day][i].projectType == "コスプレコンテスト")TSContent.style.backgroundColor="#B5D169BF";//1DFD357F
      if (day == 1) {
        TSContent.style.animationDelay = (i * 100) + "ms";
        TSContent.style.animationName = "TSContent_fadeIn";
      }
      else if (day == 2) {
        TSContent.style.opacity = "100%";
      }

      let TSGroupName = document.createElement("p");
      TSGroupName.className = "TSGroupName";
      TSGroupName.innerText = eventData[day][i].groupName;
      //有志ダンスは一纏めにする
      if (eventData[day][i].groupName == "勝手にアイドル部") continue;
      if (eventData[day][i].groupName == "あらきのだんす。") {
        TSGroupName.innerText += "/ 勝手にアイドル部";
      }

      let TSProjectType = document.createElement("p");
      TSProjectType.className = "TSProjectType";
      TSProjectType.innerText = "【" + eventData[day][i].projectType + "】";

      let TSPerformanceTime = document.createElement("p");
      TSPerformanceTime.className = "TSPerformanceTime";
      TSPerformanceTime.innerText = eventData[day][i].performanceTime;

      //TSContent.appendChild(TSProjectType);
      TSContent.appendChild(TSGroupName);
      TSContent.appendChild(TSPerformanceTime);

      parent.appendChild(TSContent);

    }
  }


  function deleteBandCCContent() {
    const removeTarget = document.getElementsByClassName("bandCCContent");
    while (removeTarget.length > 0) {
      removeTarget[0].remove();
    }
  }

  function deleteDanceCCContent() {
    const removeTarget = document.getElementsByClassName("danceCCContent");
    while (removeTarget.length > 0) {
      removeTarget[0].remove();
    }
  }


  window.addEventListener("scroll", function () {
    var scroll = this.window.scrollY;
    var windowHeight = this.window.innerHeight;

    var bandCCGroupName = this.document.getElementsByClassName("bandCCGroupName");
    for (let target of bandCCGroupName) {
      var targetPos = target.getBoundingClientRect().top + scroll;
      //スクロール量>ターゲット要素の位置のとき
      if (scroll > targetPos - windowHeight * 0.7) {
        target.style.animationName = "bandCCDescriptionAnimation";
      }
    }

    var bandCCGroupImage = this.document.getElementsByClassName("bandCCGroupImage");
    for (let target of bandCCGroupImage) {
      var targetPos = target.getBoundingClientRect().top + scroll;
      //スクロール量>ターゲット要素の位置のとき
      if (scroll > targetPos - windowHeight * 0.7) {
        target.style.animationName = "bandCCGroupImageAnimation";
      }
    }

    var bandCCsnsIcon = this.document.getElementsByClassName("bandCCsnsIcon");
    for (let target of bandCCsnsIcon) {
      var targetPos = target.getBoundingClientRect().top + scroll;
      //スクロール量>ターゲット要素の位置のとき
      if (scroll > targetPos - windowHeight * 0.7) {
        target.style.animationName = "bandCCGroupImageAnimation";
      }
    }


    var danceCCGroupName = this.document.getElementsByClassName("danceCCGroupName");
    for (let target of danceCCGroupName) {
      var targetPos = target.getBoundingClientRect().top + scroll;
      //スクロール量>ターゲット要素の位置のとき
      if (scroll > targetPos - windowHeight * 0.7) {
        target.style.animationName = "danceCCDescriptionAnimation";
      }
    }

    var danceCCGroupImage = this.document.getElementsByClassName("danceCCGroupImage");
    for (let target of danceCCGroupImage) {
      var targetPos = target.getBoundingClientRect().top + scroll;
      //スクロール量>ターゲット要素の位置のとき
      if (scroll > targetPos - windowHeight * 0.7) {
        target.style.animationName = "danceCCGroupImageAnimation";
      }
    }

    var danceCCsnsIcon = this.document.getElementsByClassName("danceCCsnsIcon");
    for (let target of danceCCsnsIcon) {
      var targetPos = target.getBoundingClientRect().top + scroll;
      //スクロール量>ターゲット要素の位置のとき
      if (scroll > targetPos - windowHeight * 0.7) {
        target.style.animationName = "danceCCGroupImageAnimation";
      }
    }
  });


  function clickDayButton() {

    //deleteTSContent();
    deleteDanceCCContent();
    deleteBandCCContent();

    let dayButton = document.getElementById("dayButton");
    if (dayButton.checked) {
      day = 2;
    }
    else {
      day = 1;
    }

    let groupHeading = document.getElementById("groupHeading");
    groupHeading.innerText = eventData[day][0] + "グループ一覧";

    //const timeScheduleArea = document.getElementById("timeScheduleArea");
    const bandCCArea = document.getElementById("bandCCArea");
    //createTSContent(timeScheduleArea);
    createDanceCCContent(bandCCArea);
    createBandCCContent(bandCCArea);

  }


  return (
    <>
      <p></p>
      <img src={`${process.env.PUBLIC_URL}/img/backGround/plant.jpg`} className="backGroundImage responsiveWidth" />
      <div className="contents">
        <div id="contents_innerBlock" className="contents_innerBlock">
          <p className="eventDescription">
            ダンス公演、バンド公演、コスプレコンテストが第一体育館にて行われます<br />
            ※公演時間は予告なしに前後する可能性があります
          </p>

          <div className="eventDescription2">
            <p>バンドの投票はformsにて行っています！</p>
            
            <p><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=XYP-cpVeEkWK4KezivJfyMJ6Hgx9Ge1EhXgWktdkJWRURTMwRUxXSUxGS00ySUFGR0pCRDFSOFlMVy4u" target="_blank" rel="noreferrer noopener">&gt;&gt;1日目投票</a></p>
            <p><a href="https://forms.office.com/Pages/ResponsePage.aspx?id=XYP-cpVeEkWK4KezivJfyMJ6Hgx9Ge1EhXgWktdkJWRUQkVKU1dCVzlTVUlHREJXRThIREo2MVc1VC4u" target="_blank" rel="noreferrer noopener">&gt;&gt;2日目投票</a></p>

            <p>企画の投票は各企画ページをご覧ください！</p>
          </div>

          <p className="heading2">タイムスケジュール</p>

          <input id="dayButton" className="dayButton" type="checkbox" onClick={clickDayButton} />

          <label for="dayButton">
            <div className="dayButtonTouchArea"></div>
          </label>

          <div id="dayButtonDispBack" className="dayButtonDispBack"></div>

          <div className="dayButtonDispTextBox">
            <div className="dayButtonDispText">1日目　2日目</div>
          </div>

          <div id="dayButtonDisp" className="dayButtonDisp"></div>

          <div className="textDescArea">
            <div className="textDance">ダンス公演</div>
            <div className="textBand">バンド公演</div>
            <div className="textCoscon">コスプレコンテスト</div>
          </div>

          <br />

          <div id="timeScheduleArea_day1" className="timeScheduleArea_day1" ></div>
          <div id="timeScheduleArea_day2" className="timeScheduleArea_day2" ></div>
          <div className="timeScheduleArea" />

          <p id="groupHeading" className="heading2"></p>
          <div id="bandCCArea" className="bandCCArea"></div>
        </div>
        <br />

      </div>
    </>
  );
}

export default Event;  