import "../homeStyle.css";
import "../../../css/pageStyle.css";

function Inquiry() {
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
          <p>第24回工華祭やこのホームページについてご不明な点やお気づきの点がございましたら、工華祭公式X(旧twitter)または下記フォームまでご連絡ください。</p>
          <br />
          <p><a href="https://twitter.com/nitgc_kokasai">工華祭公式X</a></p>
          <p><a href="https://forms.office.com/r/4VwBRzEQuM">お問合せフォーム</a></p>
          <br />
        </div>
      </div>
    </>
  );
}

export default Inquiry;