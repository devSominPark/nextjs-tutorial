import { useRouter } from "next/dist/client/router";
import { Menu } from "semantic-ui-react";

export default function Gnb() {
  const router = useRouter();

  let activeItem;

  if (router.pathname === "/") {
    activeItem = "home";
  } else if (router.pathname === "/about") {
    activeItem = "about";
  }

  function goLink(e, data) {
    // data : semantic-ui에서 제공해주는 것으로 Menu.Item의 데이터들을 의미
    if (data.name === "home") {
      router.push("/");
    } else if (data.name === "about") {
      router.push("/about");
    }
  }

  return (
    <Menu inverted>
      <Menu.Item name="home" active={activeItem === "home"} onClick={goLink} />
      <Menu.Item
        name="about"
        active={activeItem === "about"}
        onClick={goLink}
      />
      <Menu.Item
        name="Contact Us"
        active={activeItem === "contact"}
        onClick={() => {
          //해당하는 파일이 없어 404 에러 발생
          //에러페이지를 서버에서 렌더링한다면 그만큼 비용이 발생하고,
          //사용자들은 느리게 느끼므로 정적 파일로 제공
          router.push("/contact");
        }}
      />
    </Menu>
  );
}
