import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Helvetica;
    flex-direction: column;
    margin-top: 7vh;
`

const Title = styled.h1`
    font-size: 32px;
    margin-bottom: 20px;
`

const Box = styled.div`
    border: 1.5px solid black;
    width: 50vw;
    height: 48vh;
    border-radius: 10px;
    overflow-y: scroll;
    padding: 5px;
`

const GoBack =styled(Link)`
    background-color: black;
    color : white;
    padding: 15px 20px;
    border-radius: 5px;
    margin-top: 1vh;
`

export default function Works(){
    return(
        <Container>
            <Title>작업물 관리</Title>
            <Box>
                
            </Box>
            <GoBack href="/admine/home">
                관리가 페이지로 돌아가기
            </GoBack>
        </Container>
    )
}