import styled from "styled-components";
import Image from "next/image";
import logo from "/public/image/logo_black.png"
import Link from "next/link";

const Container = styled.nav`
    width: 100%;
    height: 80px;
    display: flex;
    padding: 0px 120px;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top:0;
    left: 0;
    background-color: rgba( 255, 255, 255, 0.5 );
    box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.15);
`

const Logo = styled(Image)`
`

const Menu = styled.div`
    display: flex;
    align-items: center;
`

const Item = styled.div`
    font-weight: 100;
    &:not(:last-child){
        margin-right: 50px;
    }
`



export default function NavBar(){
    return(
        <Container>
            <Link href="/">
                <Logo src={logo} alt="logo" width={75} height={35}/>
            </Link>
            <Menu>
                <Item>about</Item>
                <Item>portfolio</Item>
                <Item>contact</Item>
            </Menu>
        </Container>
    )
}