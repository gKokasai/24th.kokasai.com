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
          <p className="heading2">お問合せ</p>
          <p className="lineThrough">　第24回工華祭やこのホームページについてご不明な点やお気づきの点がございましたら、工華祭公式X（旧twitter）または下記フォームまでご連絡ください。</p>
          <p className="lineThrough inquiryLink"><a href="https://twitter.com/nitgc_kokasai">&gt;&gt;工華祭公式X</a></p>
          <p className="lineThrough inquiryLink"><a href="https://forms.office.com/r/4VwBRzEQuM">&gt;&gt;お問合せフォーム</a></p>
          <p>　現在お問合せは受付しておりません。</p>
          <br />
        </div>
      </div>
    </>
  );
}

export default Inquiry;