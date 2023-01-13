import styled from "styled-components";
import Image from "next/image";
import logo from "/public/image/logo_white.png"

const Wrapper = styled.div`
    width: 100%;
    height: 18vh;
    padding: 0px 120px;
    background-color: #1B1B1B;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 1024px;
`

const Container = styled.div`
    width: 100%;
    display: flex;
    color : white;
    font-size: 10px;
    font-weight: 100;
    align-items: flex-end;
    justify-content: space-between;
`

const Right = styled.div`
    display: flex;
    align-items: center;
    h6{
        font-weight: 600;
        margin: 0px 5px;
    }
    margin-left: 30px;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    height: 60px;
    justify-content: space-between;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    h6{
        width: 80px;
    }
`

export default function Footer(){
    return(
        <Wrapper>
            <Container>
            <Image src={logo} alt="logo" width={130} height={80}/>
            <Right>
                &copy; <h6>UNDERDOG COUNTY</h6> All Rights Reserved.
            </Right>
            <Info>
                <Item>
                    <h6>Phone</h6>
                    <span>010 - 9460 - 5088 (대표 한승훈)</span>
                </Item>
                <Item>
                    <h6>E-mail</h6>
                    <span>underdogcounty@gamil.com</span>
                </Item>
                <Item>
                    <h6>Kakao Talk</h6>
                    <span>https://open.kakao.com/o/sm8hleSe</span>
                </Item>
            </Info>
        </Container>
        </Wrapper>
    )
}