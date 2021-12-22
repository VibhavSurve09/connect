import Footer from "./Footer";
import Navbar from "./Navbar";
import Body from "./Body";
export default function Layout({ children }) {
  return (
    <html>
      <Navbar />
      <Body/>
      <Footer />
   </html>
  );
}
