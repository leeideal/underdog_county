import styled from "styled-components";
import Image from "next/image";
import img1 from "/public/image/portfolio_1.png";
import img2 from "/public/image/portfolio_2.png";
import img3 from "/public/image/portfolio_3.png";
import img4 from "/public/image/portfolio_4.png";
import img5 from "/public/image/portfolio_5.png";
import { useRouter } from "next/router";

const Container = styled.div`
    width: 100%;
    height: 82vh;
    display: flex;
    min-width: 1024px;
    max-width: 1800px;
`

const Item = styled.div`
    position: relative;
    width: 20%;
    height: auto;
    color:white;
    cursor: pointer;
    transition: color 0.6s;
    :nth-child(2):hover{
        color: black;
        transition: color 0.6s;
    }
`

const Img = styled(Image)`
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    filter: brightness(28%);
    transition: filter 0.6s;
    &:hover{
        filter: brightness(100%);
        transition: filter 0.6s;
    }
`

const Info = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    bottom :70px;
    left : 20px;
    h6{
        font-family: 'Times New Roman', Times, serif;
        font-size:24px;
        margin-bottom: 10px;
    }
    h1{
        font-family: 'Times New Roman', Times, serif;
        font-size:38px;
    }
`

export default function Portfolio(){
    const router = useRouter();
    const onclick = (id : number) => {
        if(id === 3){
            router.push("/video");
        }else{
            router.push({
                pathname : "/portfolio/artworks",
                query : {
                    id
                }
            },
            "/portfolil/artworks")
        }
    }
    return(
        <Container>
            <Item onClick={()=>onclick(1)}>
                <Img src={img1} alt="Commercial"/>
                <Info style={{}}>
                    <h6>01</h6>
                    <h1>Commercial</h1>
                </Info>
            </Item>
            <Item onClick={()=>onclick(2)}>
                <Img src={img4} alt="Snap"/>
                <Info>
                    <h6>02</h6>
                    <h1>Snap</h1>
                </Info>
            </Item>
            <Item onClick={()=>onclick(3)}>
                <Img src={img2} alt="Video"/>
                <Info>
                    <h6>03</h6>
                    <h1>Video</h1>
                </Info>
            </Item>
            <Item onClick={()=>onclick(4)}>
                <Img src={img5} alt="Product"/>
                <Info>
                    <h6>04</h6>
                    <h1>Product</h1>
                </Info>
            </Item>
            <Item onClick={()=>onclick(5)}>
                <Img src={img3} alt="Profile"/>
                <Info>
                    <h6>05</h6>
                    <h1>Profile</h1>
                </Info>
            </Item>
        </Container>
    )
}