import "../homeStyle.css";
import "../../../css/pageStyle.css";

function Credit() {
  return (
    <>
      <div className="backGroundImage responsiveWidth">
        <img src={`${process.env.PUBLIC_URL}/img/poster/kokasaiPoster.jpg`} className="kokasaiPoster_noAnimation" />
        <img src={`${process.env.PUBLIC_URL}/img/poster/kokasaiPoster.jpg`} className="kokasaiPoster_mirror" />
      </div>

      <div className="posterArea_noPosterText"></div>

      <div className="contents contents_whitesmoke noPosterText">
        <div className="contents_innerBlock">
          <br />
          <p className="heading2">ホームページ製作者</p>
          <p>デザイン：本島 琉矢</p>
          <p>ポスター：平川 大樹</p>
          <p>イラスト：奈良 凛心</p>
          <p>web開発：武藤 瑞生</p>
          <br />
        </div>
      </div>
    </>
  );
}

export default Credit;