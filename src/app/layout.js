import "./globals.css";
import Header from '../Component/Header.jsx'
import Scart from '../store/Scart'
import {Providers} from '../store/provider.jsx'
import Footer from '../Component/Footer.jsx'


export const metadata = {
  title: "Rolex Website",
  description: "Rolex Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
      />
      <body >
      <Providers>
          <Header/>
          <Scart />
          {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
