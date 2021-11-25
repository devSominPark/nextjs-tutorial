import axios from "axios";
import Item from "../../src/component/Item";
import Head from "next/head";

const Post = ({ item }) => {
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
  return {
    paths: [
      { params: { id: "740" } },
      { params: { id: "730" } },
      { params: { id: "729" } },
      ,
    ],
    fallback: true,
    // false : 없는 페이지는 대응해주지 않음(404)
    // true : 없는 페이지일 경우 처음엔 props가 빈 상태로 그려지다
    // 백그라운드에서 정적파일로 HTML과 JSON을 생성한 후 NextJS는 프리렌더링 목록에 추가
    // 두번째 접속부터 정적페이지 파일을 사용
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
