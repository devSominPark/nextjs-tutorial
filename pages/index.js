import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Divider, Header, Loader } from "semantic-ui-react";
import ItemList from "../src/component/ItemList";

export default function Home({ list }) {
  // const [list, setList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const API_URL =
  //   "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

  // 환경변수를 이용한 분기
  // const API_URL = pr÷÷ocess.env.NEXT_PUBLIC_API_URL;

  // function getData() {
  //   axios.get(API_URL).then((res) => {
  //     setList(res.data);
  //     setIsLoading(false);
  //   });
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <div>
      <Head>
        <title>KKAKKA | 까까는 고양이</title>
        <meta name="description" content="귀여운 까까"></meta>
      </Head>
      {/* {isLoading && (
        <div style={{ padding: "300px 0" }}>
          <Loader inline="centered" active>
            Loading
          </Loader>
        </div>
      )} */}
      {/* {!isLoading && ( */}
      <>
        <Header as="h3" style={{ paddingTop: 40 }}>
          베스트 상품
        </Header>
        <Divider />
        <ItemList list={list.slice(0, 9)} />
        <Header as="h3" style={{ paddingTop: 40 }}>
          신상품
        </Header>
        <ItemList list={list.slice(9)} />
      </>
      {/* )} */}
    </div>
  );
}

// getStaticProps를 이용해 위의 주석처리 코드들이 필요 없어짐
// 새로고침을 해도 빈 화면 없이 그려짐
export async function getStaticProps() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await axios.get(apiUrl);
  const data = res.data;
  return {
    props: {
      list: data,
    },
  };
}
