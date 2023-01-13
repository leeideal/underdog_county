import styled from "styled-components";
import Image from "next/image";
import logo from "/public/image/logo_black.png"
import Link from "next/link";
import { useRouter } from "next/router";

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
    z-index: 10;
`

const Logo = styled(Image)`
`

const Menu = styled.div`
    display: flex;
    align-items: center;
`

const Item = styled(Link)<{isActive : boolean}>`
    font-weight: 100;
    &:not(:last-child){
        margin-right: 50px;
    }
    border-bottom: ${props => props.isActive ? "1.5px solid black" : null};
    opacity: ${props => props.isActive ? 1 : 0.45};
    transition: all 0.8s;
    &:hover{
        opacity: 1;
        transition: all 0.8s;
    }
    position: relative;
`

const DropDown = styled.ul`
    display: none;
    position: absolute;
    top: 30px;
    left:20px;
    background-color: #ffffff;
    width: 110px;
    margin-top: 16px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    text-align: center;
`

const DropDownList = styled.li`
    padding: 12px 16px;
    font-size:13px;
    &:hover {
        background-color: #f5f5f5;
        border-radius: 5px;
    }
`



export default function NavBar(){
    const router = useRouter();
    return(
        <Container>
            <Link href="/">
                <Logo src={logo} alt="logo" width={75} height={35}/>
            </Link>
            <Menu>
                <Item isActive={router.pathname === "/about"} href="/about">about</Item>
                <Item isActive={router.pathname === "/"} href="/">portfolio
                    <DropDown>
                        <DropDownList >감정 비우기</DropDownList>
                        <DropDownList >감정 나누기</DropDownList>
                    </DropDown>
                </Item>
                <Item isActive={router.pathname === "/contact"} href="/contact">contact</Item>
            </Menu>
        </Container>
    )
}