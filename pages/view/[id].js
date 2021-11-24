import axios from "axios";
// import { useRouter } from "next/router";
// import { useEffect, useState } from "react";
import Item from "../../src/component/Item";
// import { Loader } from "semantic-ui-react";
import Head from "next/head";

const Post = ({ item, name }) => {
  // const router = useRouter();
  // const { id } = router.query;
  // const [item, setItem] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const API_URL = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;

  // function getData() {
  //   axios.get(API_URL).then((res) => {
  //     setItem(res.data);
  //     setIsLoading(false);
  //   });
  // }

  // useEffect(() => {
  //   if (id && id > 0) {
  //     getData();
  //   }
  // }, [id]);

  return (
    <>
      {/* {isLoading ? (
        <div style={{ padding: "300px 0" }}>
          <Loader inline="centered" active>
            Loading
          </Loader>
        </div>
      ) : ( */}
      {item && (
        <>
          <Head>
            <title>{item.name}</title>
            <meta name="description" content={item.description}></meta>
          </Head>
          <Item item={item} />
        </>
      )}
      {/* )} */}
    </>
  );
};

export default Post;

// getServerSideProps를 통해 서버에서 데이터를 받아와 위의 주석처리한 코드들이 필요 없어짐
export async function getServerSideProps(context) {
  const id = context.params.id;
  const apiUrl = `http://makeup-api.herokuapp.com/api/v1/products/${id}.json`;
  const res = await axios.get(apiUrl);
  const data = res.data;
  return {
    props: {
      item: data,
      name: process.env.name,
      // 개발 환경에서는 DEVELOPMENT
      // 프로덕션 환경에서는 PRODUCTION
    },
  };
}
