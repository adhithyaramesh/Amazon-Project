import { Outlet } from "react-router";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import Navbar from "../../Shared/NavBar";

const Layout = () => {
    return (
        <>

            <Header />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />

        </>
    )
}

export default Layout;
