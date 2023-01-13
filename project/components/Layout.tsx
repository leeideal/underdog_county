import Footer from "./Footer";
import HeadTitle from "./Head";
import NavBar from "./NavBar";

export default function Layout(props: { children: React.ReactNode }){
        return(
            <>
                <HeadTitle/>
                <NavBar />
                    <div>{props.children}</div>
                <Footer/>
            </>
        )
}