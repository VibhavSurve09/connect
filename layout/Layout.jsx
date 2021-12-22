import Footer from './Footer';
import Navbar from './Navbar';
export default function Layout({ children }) {
  return (
    <html>
      <Navbar />
      {children}
      <Footer />
    </html>
  );
}
