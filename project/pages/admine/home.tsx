import Link from "next/link";
import { useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 82vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Helvetica;
    flex-direction: column;
`

const Goto = styled(Link)`
    border: 1px solid black;
    border-radius: 5px;
    width: 160px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
    transition: all 0.5s;
    &:hover{
        color : white;
        background-color: black;
        transition: all 0.5s;
    }
`

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 20px;
`

export default function Admine(){
    if(typeof window !== 'undefined'){
        if(sessionStorage.getItem("ct") === "1"){
            sessionStorage.setItem("ct", "999");
            window.location.reload();
        }
    }
    return(
        <Container>
            <Title>관리자 페이지</Title>
            <Goto href="/admine/application">
                신청서 조회 &rarr;
            </Goto>
            <Goto href="/admine/artists">
                아티스트 관리 &rarr;
            </Goto>
            <Goto href="/admine/works">
                작업물 관리 &rarr;
            </Goto>
        </Container>
    )
}