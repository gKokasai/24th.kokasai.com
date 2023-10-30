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

          <div className="creditContent">
            <p className="heading3">HPデザイン</p>
            <p>本島 琉矢</p>
            <p>武藤 瑞生</p>
            <p>平川 大樹</p>
            <p>奈良 凛心</p>
            <p>関口 凱斗</p>
          </div>

          <div className="creditContent">
            <p className="heading3">イラスト・背景作成</p>
            <p>奈良 凛心</p>
          </div>

          <div className="creditContent">
            <p className="heading3">ポスター（ホーム画面背景）作成</p>
            <p>平川 大樹</p>
          </div>

          <div className="creditContent">
            <p className="heading3">マップ作成</p>
            <p>石川 真</p>
          </div>

          <div className="creditContent">
            <p className="heading3">HP開発</p>
            <p>武藤 瑞生</p>
          </div>

          <br />
        </div>
      </div>
    </>
  );
}

export default Credit;