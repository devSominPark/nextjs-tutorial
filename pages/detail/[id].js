import axios from "axios";
import Item from "../../src/component/Item";
import Head from "next/head";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";

const Post = ({ item }) => {
  const router = useRouter();
  // router.isFallback : 화면이 그려지기 전엔 true, 그려진 후 false

  if (router.isFallback) {
    return (
      <div style={{ padding: "100px 0" }}>
        <Loader active inline="centered">
          Loading
        </Loader>
      </div>
    );
  }

  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          <Item item={item} />
        </>
      )}
    </>
  );
};

export default Post;

export async function getStaticPaths() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await axios.get(apiUrl);
  const data = res.data;

  return {
    paths: data.slice(0, 9).map((item) => ({
      params: {
        id: item.id.toString(),
      },
    })),
    fallback: true,
    // false : 없는 페이지는 대응해주지 않음(404)
    // true : 없는 페이지일 경우 처음엔 props가 빈 상태로 그려지다
    // 백그라운드에서 정적파일로 HTML과 JSON을 생성한 후 NextJS는 프리렌더링 목록에 추가
    // 두번째 접속부터 정적페이지 파일을 사용
    // 첫 접속시 빈 페이지가 나오는 것을 router.isFallback을 활용해 로딩중을 띄워줄 수 있음
  };
}

// getStaticProps를 통해 다이나믹 라우트 구현 : 개수가 한정적일 때에 해당
export async function getStaticProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await axios.get(apiUrl);
  const data = res.data;
  return {
    props: {
      item: data,
    },
  };
}
