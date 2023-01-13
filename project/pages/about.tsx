import styled, {keyframes} from "styled-components";

const frames1 = keyframes`
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`

const frames2 = keyframes`
  0% {
    -webkit-filter: blur(12px);
            filter: blur(12px);
    opacity: 0;
  }
  100% {
    -webkit-filter: blur(0px);
            filter: blur(0px);
    opacity: 1;
  }
`

const Container = styled.div`
    width: 100%;
    height: 66vh;
    padding: 0 120px;
    display: flex;
    flex-direction: column;
    margin-top: 16vh;
    min-width: 1024px;
    max-width: 1700px;
    overflow-y: scroll;
`

const Title = styled.div`
    font-size: 80px;
    width: fit-content;
`
const Item = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    span{
        font-family: 'Times New Roman', Times, serif;
        font-weight: 100;
    }
    div{
        border-bottom: 5px solid black;
        margin-right: 20px;
        font-weight: 500;
    }
    h2{
        width: 100%;
        text-align: end;
        font-family: 'Times New Roman', Times, serif;
        font-weight: 100;
    }
`

const Item2 = styled(Item)`
    animation: ${frames1} 0.8s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
`

const Info = styled.div`
    margin-top: 30px;
    width: 100%;
    font-family: "Noto Sans CJK KR", sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 1.8;
    animation: ${frames2} 2s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
    animation-delay: 0.5s;
`

export default function About(){
    return(
        <Container>
            <Title>
                <Item>
                    <span style={{marginRight : "20px"}}>Hello.</span>
                    <h1>We are</h1>
                </Item>
                <Item2>
                    <div>UNDERDOG</div>
                    <h1>COUNTY</h1>
                </Item2>
                <Item>
                    <h2>: The skill - fools</h2>
                </Item>
            </Title>
            <Info>
                안녕하세요. 감각적인 광대들, 문화예술 미디어 사업체 언더독카운티입니다. <br/>
                저희 언더독카운티는 시작의 발판을 마련하고<br/>
                성장의 기회를 찾는 모든 예술가 / 사업가 클라이언트들에게 힘이 되고자<br/>
                수준급의 사진, 영상 제작물을 요청사항에 맞춰 합리적인 가격에 제작해드리는 서포팅 미디어 사업체입니다.<br/>
                실력과 열정을 갖춘 모든 사람들이 보장된 기회를 누릴 수 있도록 저희가 함께 노력하겠습니다.
            </Info>
        </Container>
    )
}