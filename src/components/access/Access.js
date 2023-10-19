import { useEffect } from "react";
import AccessContent from "./AccessContent";
import "../../css/pageStyle.css";
import "./accessStyle.css"

function Access() {
  //普通のgooglemap
  //<iframe id="googleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3212.3668851173343!2d139.02025627574992!3d36.37611147237107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601e8cc32e0daf8d%3A0x207d7e6356e87ed8!2z576k6aas5bel5qWt6auY562J5bCC6ZaA5a2m5qCh!5e0!3m2!1sja!2sjp!4v1691332826280!5m2!1sja!2sjp" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>

  window.addEventListener("scroll", function () {
    var scroll = this.window.scrollY;
    var windowHeight = this.window.innerHeight;
    var targets = this.document.getElementsByClassName("accessContent"); //accessContent:AccessContent内のクラス
    for (let target of targets) {
      var targetPos = target.getBoundingClientRect().top + scroll;
      //スクロール量>ターゲット要素の位置のとき
      if (scroll > targetPos - windowHeight * 0.7) {
        target.style.animationName = "accessContentAnimation";
      }
    }
  });

  //1度だけ実行
  useEffect(() => {
    //さかなを生成
    const fishArea = document.getElementById("fishArea");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 6; j++) {
        let fish = document.createElement("img");
        fish.classList.add("fish");

        let random = Math.floor( Math.random()*3); //0~2
        if(random==0){
          fish.src=`${process.env.PUBLIC_URL}/img/utility/fish1.png`;
          fish.style.transform="scale(-1,1) rotate(45deg)";
        }
        else if(random==1){
          fish.src=`${process.env.PUBLIC_URL}/img/utility/fish2.png`;
          fish.style.transform="scale(-1,1) rotate(45deg)";
        }
        else if(random==2){
          fish.src=`${process.env.PUBLIC_URL}/img/utility/fish3.png`;
          fish.style.transform="scale(-1,1) rotate(0deg)";
        }

        //fish.style.animationDelay = i * 0.2 + Math.random() * 0.2 - 0.1 + "s";
        fish.style.animationDelay = i * 0.6 + Math.random() * 0.4 - 0.2 + "s";
        fish.style.animationName = "fishAnimation";
        //fish.style.top = -4 + j * 16 + Math.random() * 8 - 4 + "%";
        fish.style.top = -8 + j * 16 + Math.random() * 8 - 4 + "%";
        fishArea.appendChild(fish);
      }
    }

    //fishAreaに当たり判定吸われるので非表示にする
    setTimeout(() => {
      fishArea.style.display="none";
    }, 2700); //アニメーション時間+delayの最大
  }, []);

  return (
    <>

      <img src={`${process.env.PUBLIC_URL}/img/backGround/sea.jpg`} className="backGroundImage responsiveWidth" />
      <div className="contents">
        <div className="contents_innerBlock">
          <br />
          <p className="heading2">周辺地図</p>
          <iframe id="googleMap" className="googleMap" src="https://www.google.com/maps/d/embed?mid=1yr0FgpbJGUNZzaKegu56loIZQUq-Klo&ehbc=2E312F"></iframe>

          <p className="heading2">アクセス</p>

          <AccessContent>
            <p className="heading3">JR新前橋駅より</p>
            <ul className="ul_access">
              <li>徒歩約30分</li>
              <li>タクシー約10分</li>
            </ul>
          </AccessContent>
          <br />

          <AccessContent>
            <p className="heading3">JR井野駅より</p>
            <ul className="ul_access">
              <li>
                バス約20分<br />
                井野駅北バス停<br />
                &emsp;↓<br />
                市内循環バス「ぐるりん」大八木線・中尾先回りで約20分（系統番号6）<br />
                &emsp;↓<br />
                群馬高専前下車
              </li>
            </ul>
          </AccessContent>
          <br />

          <AccessContent>
            <p className="heading3">JR高崎駅より</p>
            <ul className="ul_access">
              <li>
                バス約44分<br />
                高崎駅西口バス停9番のりば<br />
                &emsp;↓<br />
                市内循環バス「ぐるりん」大八木線・中尾先回り（系統番号6）<br />
                &emsp;↓<br />
                群馬高専前下車
              </li>
              <li>タクシー約30分</li>
            </ul>
          </AccessContent>
          <br />

          <AccessContent>
            <p className="heading3">関越自動車道 前橋インターチェンジより（約1km）</p>
            <ul className="ul_access">
              <li>車で約5分</li>
            </ul>
          </AccessContent>

          <br />

        </div>

        <div id="fishArea" className="fishArea responsiveWidth"></div>

      </div>
    </>
  );
}

export default Access;  