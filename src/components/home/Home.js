import { useEffect } from "react";
import "./homeStyle.css";
import "../../css/pageStyle.css";
import { Pages } from "../Pages";

function Home() {
  //1度だけ実行
  useEffect(() => {
    const ref = document.referrer;

    //このページへの遷移前のパスに"24th.kokasai.com"が含まれるとき
    if (ref.indexOf("24th.kokasai.com") != -1) {
      let kokasaiPoster = document.getElementById("kokasaiPoster");
      kokasaiPoster.style.animationDelay = 0 + "s";
      kokasaiPoster.style.animationDuration = 0 + "s";

      let posterArea = document.getElementById("posterArea");
      for (let child of posterArea.children) {
        child.style.animationDelay = 0 + "s";
        child.style.animationDuration = 0 + "s";
      }
    }
  }, []);

  //旧アナウンス内容
  /*
  <li className="li_home"><p>企画のいいね機能は、はじめに企画ページを表示してから5分間は投票出来ないようになっています（それ以降は待ち時間なしで投票できるようになります）。ご承知おきください。</p></li>
  <li className="li_home"><p>交通の混乱を避けるため、大駐車場入口前の道路は<spam className="heading4">右折禁止</spam>とさせていただきます。関越自動車道を利用して乗用車で来場される方は特にご注意ください。</p></li>
  <li className="li_home"><p>各企画の人気投票を行っています。各企画の紹介ページにあるハートをタップすることで票を入れることができます。ぜひご参加ください。</p></li>
  <li className="li_home"><p>各企画に加えて各バンドの投票も行っています。バンドの投票はステージ企画のページをご覧ください。</p></li>
  */

  return (
    <>
      <div className="backGroundImage responsiveWidth">
        <img src={`${process.env.PUBLIC_URL}/img/poster/kokasaiPoster.jpg`} id="kokasaiPoster" className="kokasaiPoster" />
        <img src={`${process.env.PUBLIC_URL}/img/poster/kokasaiPoster.jpg`} id="kokasaiPoster_mirror" className="kokasaiPoster_mirror" />
      </div>
      <div id="posterArea" className="posterArea">
        <img src={`${process.env.PUBLIC_URL}/img/poster/kosenTitle.png`} className="kosenTitle" />
        <img src={`${process.env.PUBLIC_URL}/img/poster/mojamoja.png`} className="mojamoja" />
        <img src={`${process.env.PUBLIC_URL}/img/poster/mainTitle.png`} className="mainTitle" />
        <img src={`${process.env.PUBLIC_URL}/img/poster/subTitle.png`} className="subTitle" />
        <img src={`${process.env.PUBLIC_URL}/img/poster/text24th.png`} className="text24th" />
      </div>

      <div className="contents contents_whitesmoke">
        <div className="contents_innerBlock">
          <br />

          <p className="heading2">アナウンス</p>

          <div className="announceContents">
            <ul className="ul_home">
              <p className="announce_conclude">第24回工華祭は終了しました。</p>
              <p className="announce_conclude">次回もお楽しみに！</p>
            </ul>
          </div>

          <p className="heading2">詳細情報</p>
          <p className="heading3">開催日時</p>
          <p>11月4日(土) 9:30～16:30<br />
            11月5日(日) 9:30～16:30</p>
          <p>＜今年度は一般公開となります＞</p>


          <p className="heading3">開催場所</p>
          <p>群馬工業高等専門学校</p>
          <p><a href="https://www.gunma-ct.ac.jp/" target="_blank" rel="noreferrer noopener">&gt;&gt;公式HPはこちら</a></p>
          <p>来場方法については<a href={Pages.access.path}>アクセス</a>をご覧ください</p>


          <p className="heading3">注意事項</p>
          <ul className="ul_home">
            <li className="li_home">マップに色で示された場所以外および工事場所への立ち入りは禁止されています。</li>
            <li className="li_home">ゴミは構内に設置されたゴミ箱に捨ててください<br />また、燃えるゴミ・燃えないゴミ・ペットボトルの分別にご協力ください。</li>
            <li className="li_home">構内は全面禁酒・禁煙となっております<br />酒類の持ち込みはご遠慮ください。</li>
            <li className="li_home">駐車場・駐輪場は指定の場所のみ利用可能です<br />学校周辺での道路上駐車は近隣の方々へのご迷惑となりますのでご遠慮ください。<br />駐車場・駐輪場の場所についてはアクセスページをご覧ください。</li>
            <li className="li_home">駐車場・駐輪場を含む構内で発生した事故・盗難に関して本校は責任を負いかねますのでご了承ください。</li>
            <li className="li_home">落とし物をした場合または落とし物を拾った場合は、実行委員会本部までお越しください。</li>
          </ul>

          <p className="heading2">役員あいさつ</p>

          <div className="portraitArea">
            <div className="portraitFrameTitleArea">
              <div className="portraitFrame">
                <img className="portraitImage" src={`${process.env.PUBLIC_URL}/img/portrait/portrait_mitani.webp`} />
              </div>
              <div className="portraitTitle">
                <span>学校長<br />
                  三谷 卓也<br />
                  <span className="heading4">第24回工華祭開催！</span>
                </span>
              </div>
            </div>
            <div className="portraitTextArea">
              <div className="portraitText">
                <p>　「OPEN SESAME」と呪文を唱え、扉を開けたら、いよいよ待ちに待った、しかも久しぶりの制限のない工華祭の開幕です！<br />
                  学生諸君に一言。<br />
                  祭りなんてものは、「楽しんだ者勝ち」です。準備の大変さ、本番の忙しさやワクワク感、そして後片付けでの寂寥感…。それらすべてを楽しみ尽くしてください。<br />
                  そして来校された皆様にも一言。<br />
                  ぜひ、学生達と一緒になってこの２年に１度のお祭りを盛り上げ、思う存分楽しんでいただければ幸いです。</p>
              </div>
            </div>
          </div>

          <div className="portraitArea">
            <div className="portraitFrameTitleArea">
              <div className="portraitFrame">
                <img className="portraitImage" src={`${process.env.PUBLIC_URL}/img/portrait/portrait_sakuraoka.webp`} />
              </div>
              <div className="portraitTitle">
                <span>学生主事<br />
                  櫻岡 広<br />
                  <span className="heading4">第24回工華祭開催にあたって</span>
                </span>
              </div>
            </div>
            <div className="portraitTextArea">
              <div className="portraitText">
                <p>　第24回工華祭の開催を心よりお祝い申し上げます。前回はコロナ禍の中、入場者の制限などいろいろと配慮を強いられる工華祭でしたが、やっと例年通りに開けること嬉しく思います。学生諸君はこの2日は勉強のことは少し忘れて大いに楽しんでください。ご来場の皆様方、本日は第24回工華祭にお越しいただき誠にありがとうございます。普段と違う学生の様子をご覧いただき、楽しんでいただければ幸いです。最後に、今年は地区文化発表会を本校で開催しました。その運営と兼務している工華祭実行委員も多数いることと思います。あと少しです。頑張ってください。</p>
              </div>
            </div>
          </div>

          <div className="portraitArea">
            <div className="portraitFrameTitleArea">
              <div className="portraitFrame">
                <img className="portraitImage" src={`${process.env.PUBLIC_URL}/img/portrait/portrait_motojima.webp`} />
              </div>
              <div className="portraitTitle">
                <span>工華祭実行委員長<br />
                  本島 琉矢<br />
                  <span className="heading4">OPEN SESAME!!</span>
                </span>
              </div>
            </div>
            <div className="portraitTextArea">
              <div className="portraitText">
                <p>　今回の工華祭のサブタイトルは、”OPEN SESAME”です。このフレーズは「アラビアンナイト」の一篇、「アリババと40人の盗賊」に出てくる呪文で、ほとんどの人が聞いたことがあると思います。物語の中では”OPEN SESAME”と唱えることで、岩の扉が開き、盗賊が隠した財宝が出てきます。これをコロナ規制が明けた今回工華祭と例え、このサブタイトルを付けました。今回の工華祭では、高専の魅力を色々な人に知ってもらいたいというモットーで運営しています。高専の魅力を色々な人に知ってもらい、さらには学生全員が楽しめるような工華祭にしたいと思っています。</p>
              </div>
            </div>
          </div>

          <br />
          <br />

        </div>

      </div>
    </>
  );
}

export default Home;