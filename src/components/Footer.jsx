import GithubCorners from "@uiw/react-github-corners/src/index.tsx";

export default function Footer(props) {
    return <footer>
      <p>By Benjamin Martin 🦅</p>

      <GithubCorners
        href={"https://github.com/bm9k/catan-map-generator"}
        bgColor="#222"
        color="#0966a5"
        size={80}
        position="left"
      />
    </footer>
}