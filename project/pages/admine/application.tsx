import Link from "next/link";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from 'react';

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

const Item = styled.div`
    border-bottom : 1.5px solid black;
    &:last-child{
        border-bottom : none;
    }
    margin: 10px 0px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 5px;
`

const Overlay = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: fixed;   // 다른것들보다 가장 위에 있게 함
    top:0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.8);
`;

const BigBox = styled(motion.div)`
    width: 50vw;
    height: 70vh;
    background-color: #B3EDE1;
    border-radius: 20px;
    position: relative;
`

const test = [
    {
        id : 1,
        name : "서희찬",
        email : "dguLikeLion@likelion.com",
        phoneNumber : "010-1234-5678",
        contest : "하하"
    },
    {
        id : 2,
        name : "서희찬",
        email : "dguLikeLion@likelion.com",
        phoneNumber : "010-1234-5678",
        contest : "하하"
    },
    {
        id : 3,
        name : "서희찬",
        email : "dguLikeLion@likelion.com",
        phoneNumber : "010-1234-5678",
        contest : "하하"
    }
]

interface IData{
    id : number;
    name : string;
    phoneNumber : string;
    email : string;
    content : string;
}

export default function Application(){
    const [clicked, setClicked] = useState(false);
    const [clickedInfo, setClickedInfo] = useState<IData | null>(null);

    return(
        <Container>
            <Title>신청서 전체 조회</Title>
            <Box>
                {test.map(prev => (
                    <Item onClick={()=>setClickedInfo(prev=>prev)}>
                        <div>
                            {prev.id}
                        </div>
                        <div>
                            {prev.name}
                        </div>
                        <div>
                            {prev.email}
                        </div>
                        <div>
                            {prev.phoneNumber}
                        </div>
                    </Item>
                ))}
            </Box>
            {/* 모달창 */}
            <AnimatePresence>{clicked ? 
                    <Overlay 
                        initial={{ opacity : 0}}
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                    >
                        <BigBox>
                            {clickedInfo?.id}
                        </BigBox>
                    </Overlay> : null}
            </AnimatePresence>
        </Container>
    )
}