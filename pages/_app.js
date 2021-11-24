import "../styles/globals.css";
import "semantic-ui-css/semantic.min.css";
import Footer from "../src/component/Footer";
import Top from "../src/component/Top";

function MyApp({ Component, pageProps }) {
  // Component : 현재 페이지를 의미, 페이지 전환시 Component의 props가 변경
  // pageProps : data patching method를 통해 미리 가져온 초기 객체

  return (
    <div style={{ width: "60%", margin: "0 auto" }}>
      <Top />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
