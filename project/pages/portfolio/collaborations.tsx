import { useRouter } from "next/router";
import styled from "styled-components";

const Container = styled.div`
width: 100%;
height: 66vh;
padding: 0 120px;
display: flex;
flex-direction: column;
margin-top: 16vh;
min-width: 1024px;
max-width: 1700px;
`

export default function Collaborations(){
    const router = useRouter();
    console.log(router.query);
    return(
        <Container>

        </Container>
    )
}