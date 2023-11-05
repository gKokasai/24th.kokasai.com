import { Pages } from "../../Pages";
import "../../../css/pageStyle.css";
import "../projectStyle.css";
import projectData from "../../../json/projectData.json";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

//firebase
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/compat/auth";
import "firebase/compat/firestore";

function ProjectDetail() {

  //初期設定
  const firebaseConfig = {
    apiKey: "AIzaSyCcPN5IiEcM2ch-QELu33aa8GteM1IrV2k",
    authDomain: "thkokasaivote-2.firebaseapp.com",
    projectId: "thkokasaivote-2",
    storageBucket: "thkokasaivote-2.appspot.com",
    messagingSenderId: "670433461652",
    appId: "1:670433461652:web:ab11aab773c1ec3bd1bb81"
  };
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();

  var uid = "";
  var isSignedIn = false;
  var isVoteAvailable = false;


  var clickNikeDate = Date.now();
  const cooltime = 1000; //いいねのクールタイム[ms]
  const allowVoteTime = 30000; //アカウントから投票できるようになるまでのクールタイム[ms]
  //const allowVoteTime = 300000; //5分

  //クエリを取得
  const quely = new URLSearchParams(useLocation().search);
  var grd = parseInt(quely.get("grd"));
  var cls = parseInt(quely.get("cls"));
  if (grd == null) grd = 1;
  if (cls == null) cls = 1;
  if (grd == 0) grd = 1;
  if (cls == 0) cls = 1;
  if (projectData[grd] == undefined) {
    grd = 1;
    cls = 1;
  }
  if (projectData[grd][cls] == undefined) {
    grd = 1;
    cls = 1;
  }

  //1度だけ実行
  useEffect(() => {
    const groupName = document.getElementById("groupName");
    groupName.innerHTML = projectData[grd][cls].groupName;

    const projectName = document.getElementById("projectName");
    projectName.innerHTML = projectData[grd][cls].projectName;

    const description = document.getElementById("description");
    description.innerHTML = projectData[grd][cls].description;

    const projectImage = document.getElementById("projectImage");
    //projectImage.src="../img/circleCut/cc"+a+"-"+b+".png";
    projectImage.src = projectData[grd][cls].imgPath;

    const titleMark = document.getElementById("titleMark");
    setColor(titleMark, grd, cls);

    if (projectData[grd][cls].mapType == "0") {
      const toMapButton = document.getElementById("toMapButton");
      toMapButton.classList.add("invisible");
    }

  }, []);

  function setColor(target, grd, cls) {
    const markColor = [
      "#0000ff",
      "#ffa500",
      "#ff0000",
      "#ffff00",
      "#008000"
    ];
    if (1 <= grd && grd <= 5) {
      target.style.backgroundColor = markColor[cls - 1]; //学科の色
    }
    else if (6 <= grd && grd <= 8) {
      target.style.backgroundColor = "#00ffff"; //水色
    }
    else if (9 <= grd && grd <= 10) {
      target.style.backgroundColor = "#ffc0cb"; //ピンク
    }
    else if (11 <= grd && grd <= 12) {
      target.style.backgroundColor = "#00ff00"; //ライム
    }
    else if (grd == 13) {
      target.style.backgroundColor = "#8a2be2"; //紫色
    }
    else {
      target.style.backgroundColor = "#696969"; //灰色
    }
  }


  //右の企画へ飛ぶ
  function changeLeftPage() {
    let newA = 1;
    let newB = 1;
    if (cls == 1) {
      if (grd == 1) {
        newA = projectData.length - 1; //企画の最後の組
        newB = projectData[newA].length - 1; //企画の最後の組の最後の要素
      }
      else {
        newA = grd - 1; //aの1つ前の組
        newB = projectData[newA].length - 1; //aの1つ前の組の最後の要素
      }
    }
    else {
      newA = grd;
      newB = cls - 1;
    }
    window.location.assign(Pages.projectDetail.path + "?grd=" + newA + "&cls=" + newB);
  }

  //左の企画へ飛ぶ
  function changeRightPage() {
    let newA = 1;
    let newB = 1;
    if (cls == projectData[grd].length - 1) {
      if (grd == projectData.length - 1) {
        newA = 1;
        newB = 1;
      }
      else {
        newA = grd + 1;
        newB = 1;
      }
    }
    else {
      newA = grd;
      newB = cls + 1;
    }
    window.location.assign(Pages.projectDetail.path + "?grd=" + newA + "&cls=" + newB);
  }


  //サインイン(匿名)
  firebase.auth().signInAnonymously()
    .then(() => {
      // Signed in..
      console.log("signed in");
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage);
    });

  //サインインしたとき(匿名)
  firebase.auth().onAuthStateChanged((user) => {
    isSignedIn = user;
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      uid = user.uid;
      //console.log(uid);

      const creationTime = user.metadata.creationTime;
      const creationTimeNum = new Date(creationTime).getTime();
      const nowDate = Date.now();
      const deltaCreationTime = nowDate - creationTimeNum;
      console.log(deltaCreationTime);
      //アカウント作成から今までの時間がallowVoteTimeのクールタイムを超えたら
      if (deltaCreationTime > allowVoteTime) {
        isVoteAvailable = true;
      }
      console.log(isVoteAvailable);

    } else {
      // User is signed out
      console.log("signed out");
      // ...
    }
    
    //投票データを取得
    recieveVoteData();
  });


  function setNice(word) {

    let collection = db.collection(word); // コレクション collection 

    // set はドキュメントの名前を指定して追加する
    // すでに同のドキュメントがあると上書きする
    if (isSignedIn) {
      collection.doc(uid).set({
        time: firebase.firestore.FieldValue.serverTimestamp()
      });
    }
    else {
      console.log("send failed");
    }

    changeHeart(`${process.env.PUBLIC_URL}/img/utility/heart2.png`);
  }

  function unsetNice(word) {

    db.collection(word).doc(uid).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

    changeHeart(`${process.env.PUBLIC_URL}/img/utility/heart1.png`);
  }

  function changeHeart(heartImg) {
    let niceImage = document.getElementById("niceImage");
    niceImage.style.animationName = "niceOutAnimation";
    setTimeout(() => {
      niceImage.src = heartImg;
      niceImage.style.opacity = 50 + "%";
      niceImage.style.animationName = "niceInAnimation";
      recieveVoteData();
    }, 200);
    setTimeout(() => {
      niceImage.style.opacity = 100 + "%";
    }, cooltime);
  }

  function recieveVoteData() {

    let collection = db.collection(grd + "-" + cls);
    collection.get().then(querySnapshot => {

      let isChecked = false;
      querySnapshot.forEach(doc => {
        if (doc.id == uid) {
          isChecked = true;
        }
      });

      let niceButton = document.getElementById("niceButton");
      let niceImage = document.getElementById("niceImage");
      if (isChecked) {
        niceButton.checked = true;
        niceImage.src = `${process.env.PUBLIC_URL}/img/utility/heart2.png`;
      }
      else {
        niceButton.checked = false;
        niceImage.src = `${process.env.PUBLIC_URL}/img/utility/heart1.png`
      }
      niceButton.classList.remove("invisible");
      niceImage.style.opacity = 50 + "%";
      setTimeout(() => {
        console.log(isVoteAvailable);
        if (isVoteAvailable) {
          niceImage.style.opacity = 100 + "%";
        }
      }, cooltime);
      let numberOfLikes = document.getElementById("numberOfLikes");
      numberOfLikes.innerText = querySnapshot.docs.length;

    });

  }


  function clickNice() {

    if (isVoteAvailable) {
      let nowDate = Date.now();
      let elapsedTime = nowDate - clickNikeDate;
      if (elapsedTime > cooltime) {
        let niceButton = document.getElementById("niceButton");
        if (niceButton.checked) {
          setNice(grd + "-" + cls);
        }
        else {
          unsetNice(grd + "-" + cls);
        }

        clickNikeDate = nowDate;
      }
      else {
        //alert入れるとボタン効かなくなる
        //let elapsedTime_s = elapsedTime / 1000;
        //alert("クールタイム中\n" + elapsedTime_s.toFixed(1) + "秒待ってください");
      }
    }

  }



  //企画一覧にもどる
  function backToProjectPage() {
    let path = Pages.project.path + "?grd=" + grd;
    window.location.assign(path);
  }

  //マップページに移動
  function toMapPage() {
    window.location.assign(Pages.map.path + "?grd=" + grd + "&cls=" + cls);
  }

  //<p>※投票のためのユーザー情報はブラウザごとに保存されます。不正を防ぐため、初回の登録時から5分間はいいねをすることが出来ませんのでご承知おきください。5分経っても投票ができない場合は、ページを再読み込みしてください。</p>

  return (
    <>
      <img src={`${process.env.PUBLIC_URL}/img/backGround/space.jpg`} className="backGroundImage responsiveWidth" />


      <div id="contents" className="contents contents_spaceSmoke">
        <div className="contents_innerBlock">
          <br />
          <button className="backButton" onClick={backToProjectPage}>◀back</button>

          <div className="imageTitleArea">
            <div className="titleArea">
              <div id="titleMark" className="titleMark" />
              <p id="groupName" className="groupNameText"></p>
              <p id="projectName" className="projectNameText"></p>
            </div>
            <div className="imageArea">
              <input type="image" className="leftButton" src={`${process.env.PUBLIC_URL}/img/utility/leftArrow.png`} onClick={changeLeftPage} />
              <input type="image" className="rightButton" src={`${process.env.PUBLIC_URL}/img/utility/rightArrow.png`} onClick={changeRightPage} />
              <img id="projectImage" className="projectImage" />
            </div>
          </div>

          <div className="niceArea">
            <div id="numberOfLikes" className="numberOfLikes"></div>
            <input id="niceButton" className="niceButton invisible" type="checkbox" onClick={clickNice} />
            <div className="niceImageArea">
              <label for="niceButton">
                <img id="niceImage" className="niceImage" />
              </label>
            </div>

          </div>

          <div className="descriptionArea">
            <p id="description" className="description"></p>
            <button id="toMapButton" className="toMapButton" onClick={toMapPage}>&gt;&gt;マップで場所を確認</button>
          </div>

          <div className="cautionArea">
            <p className="heading3">いいね機能について</p>
            <ul className="projectDetail_ul">
              <li><p>サークルカットの下にあるハートのボタンを押すことで、その企画にいいねをすることができます。</p></li>
              <li><p>工華祭終了時の、各企画のいいねの数によってランキングが決定します。ふるって投票にご参加ください。</p></li>
            </ul>
          </div>

          <br />

        </div>

      </div>
    </>
  );
}

export default ProjectDetail;