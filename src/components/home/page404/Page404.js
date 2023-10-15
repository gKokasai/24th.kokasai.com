import "../homeStyle.css";
import "../../../css/pageStyle.css";
import { Pages } from "../../Pages";

function Page404() {
  return (
    <>
      <div className="backGroundImage responsiveWidth">
        <img src={`${process.env.PUBLIC_URL}/img/poster/kokasaiPoster.jpg`} className="kokasaiPoster_noAnimation" />
        <img src={`${process.env.PUBLIC_URL}/img/poster/kokasaiPoster.jpg`} className="kokasaiPoster_mirror" />
      </div>

      <div className="posterArea_noPosterText"></div>

      <div className="contents contents_whitesmoke noPosterText">
        <div className="contents_innerBlock apologize_center">
          <br />
          <br />
          <br />
          <br />
          <p>お探しのページが見つかりません</p>
          <p><a href={Pages.home.path}>ホームに戻る</a></p>
          <br />
          <br />
          <br />
          <br />
        </div>
        <br />
      </div>
    </>
  );
}

export default Page404;