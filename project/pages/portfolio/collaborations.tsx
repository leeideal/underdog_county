import styled from "styled-components";

const Container = styled.div`
width: 100%;
height: 66vh;
padding: 0 120px;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 16vh;
min-width: 1024px;
max-width: 1800px;
`

const Title = styled.h1`
    font-family: 'Times New Roman', Times, serif;
    font-size: 28px;
`

const Info = styled.div`
    
`

export default function Collaborations(){
    return(
        <Container>
            <Title>Collaborations</Title>
            <Info>
                
            </Info>
        </Container>
    )
}