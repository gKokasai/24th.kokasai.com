import { useEffect } from "react";
import AccessContent from "./AccessContent";
import "../../css/pageStyle.css";
import "./accessStyle.css"

function Access() {
  //普通のgooglemap
  //<iframe id="googleMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3212.3668851173343!2d139.02025627574992!3d36.37611147237107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601e8cc32e0daf8d%3A0x207d7e6356e87ed8!2z576k6aas5bel5qWt6auY562J5bCC6ZaA5a2m5qCh!5e0!3m2!1sja!2sjp!4v1691332826280!5m2!1sja!2sjp" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  //カスタムgooglemap
  //<iframe id="googleMap" className="googleMap" src="https://www.google.com/maps/d/embed?mid=1yr0FgpbJGUNZzaKegu56loIZQUq-Klo&ehbc=2E312F"></iframe>


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

        let random = Math.floor(Math.random() * 3); //0~2
        if (random == 0) {
          fish.src = `${process.env.PUBLIC_URL}/img/utility/fish1.png`;
          fish.style.transform = "scale(-1,1) rotate(45deg)";
        }
        else if (random == 1) {
          fish.src = `${process.env.PUBLIC_URL}/img/utility/fish2.png`;
          fish.style.transform = "scale(-1,1) rotate(45deg)";
        }
        else if (random == 2) {
          fish.src = `${process.env.PUBLIC_URL}/img/utility/fish3.png`;
          fish.style.transform = "scale(-1,1) rotate(0deg)";
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
      fishArea.style.display = "none";
    }, 2700); //アニメーション時間+delayの最大
  }, []);

  //駐車場配置図
  //<p><a href={`${process.env.PUBLIC_URL}/img/parking/parking_1.jpg`} target="_blank" rel="noreferrer noopener">&gt;&gt;大駐車場付近配置図</a></p>
  //<p><a href={`${process.env.PUBLIC_URL}/img/parking/parking_2.jpg`} target="_blank" rel="noreferrer noopener">&gt;&gt;南門駐車場付近配置図</a></p>

  return (
    <>

      <img src={`${process.env.PUBLIC_URL}/img/backGround/sea.jpg`} className="backGroundImage responsiveWidth" />
      <div className="contents">
        <div className="contents_innerBlock">
          <br />
          <p className="heading2">周辺地図</p>
          <iframe id="googleMap" className="googleMap" src="https://www.google.com/maps/d/embed?mid=1yr0FgpbJGUNZzaKegu56loIZQUq-Klo&ehbc=2E312F"></iframe>

          <br />
          <br />

          <p className="heading2">アクセス</p>

          <AccessContent>
            <p className="heading3">JR新前橋駅より</p>
            <ul className="ul_access">
              <li>徒歩約30分</li>
              <li>タクシー約10分</li>
            </ul>
          </AccessContent>

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

          <AccessContent>
            <p className="heading3">関越自動車道 前橋インターチェンジより（約1km）</p>
            <ul className="ul_access">
              <li>車で約5分</li>
            </ul>
          </AccessContent>

          <br />

          <p className="heading2">駐車場・駐輪場について</p>

          <AccessContent>
            <ul className="ul_access">
              <li>乗用車でお越しの方は、南西にある<span className="heading4">大駐車場</span>もしくは<span className="heading4">南門から入って右手の駐車場</span>をご利用ください。</li>
            </ul>
          </AccessContent>

          <AccessContent>
            <ul className="ul_access">
              <li>原付・バイクでお越しの方は、<span className="heading4">大駐車場の駐輪スペースの東側半分</span>をご利用ください。</li>
            </ul>
          </AccessContent>

          <AccessContent>
            <ul className="ul_access">
              <li>自転車でお越しの方は、<span className="heading4">正門から入って右奥の駐輪場</span>をご利用ください。</li>
            </ul>
          </AccessContent>

          <AccessContent>
            <p className="heading3">諸注意</p>
            <p>※駐車場は両日<span className="heading3">9:30</span>からの解放となります。</p>
            <p>※乗用車は<span className="heading4">一家族様につき一台</span>での来場をお願いします。</p>
            <p>※交通の混乱を避けるため、大駐車場入口前の道路は<spam className="heading4">右折禁止</spam>とさせていただきます。関越自動車道を利用して乗用車で来場される方は特にご注意ください。</p>
            <p>※当日は混雑が予想されますので、構内の駐車場への駐車が厳しいと判断された場合、<span className="heading4">新前橋駅付近の有料駐車場への駐車をお願いする場合があります</span>。あらかじめご了承ください。</p>
          </AccessContent>

          <br />

        </div>

        <div id="fishArea" className="fishArea responsiveWidth"></div>

      </div>
    </>
  );
}

export default Access;  