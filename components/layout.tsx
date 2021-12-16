import Footers from "./Footer/footer";
import Headers from "./Header/header";

export default function Layout({ children }: any) {
  return (
    <div>
      <Headers />
      {children}
      <Footers />
    </div>
  );
}
