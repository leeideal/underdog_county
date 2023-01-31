import Link from "next/link";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { LogAPI } from "@/api";

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
    height: 80vh;
    border-radius: 20px;
    position: relative;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    div{
        margin: 20px 0px;
    }
`

const XMark = styled(FontAwesomeIcon)`
    font-size: 24px;
    position: absolute;
    top:15px;
    right: 15px;
    cursor: pointer;
`

const GoBack =styled(Link)`
    background-color: black;
    color : white;
    padding: 15px 20px;
    border-radius: 5px;
    margin-top: 1vh;
`

const DeleteBtn = styled.div`
    margin-top: 10px;
    cursor: pointer;
    color : white;
    background-color: black;
    padding: 10px;
    border-radius: 10px;
`

interface IData{
    id : number;
    name : string;
    email : string;
    phoneNumber : string;
    contents : string;
}

export default function Application(){
    const [clicked, setClicked] = useState(false);
    const [clickedInfo, setClickedInfo] = useState<IData | null>(null);
    const [allData, setAllData] = useState<IData[]>([]);
    const onclick = (data : IData) => {
        setClicked(prev => !prev);
        setClickedInfo(data);
    }

    // 전체 데이터 요청
    const getData = async() => {
        try{
            const data = await LogAPI.get("/contact/application");
            setAllData(data.data)
        }catch(error){
            console.log(error)
        }
    }

    // 지원서삭제
    const deleteClick = async(id : number) => {
        await LogAPI.delete(`/contact/application/${id}`).then(
            response => {
                window.alert("삭제되었습니다!(1분이내로 삭제)");
            }
        )
        setClicked(prev=>!prev)
    }

    useEffect(()=>{
        getData();
    },[])

    console.log(clickedInfo)

    return(
        <Container>
            <Title>신청서 전체 조회</Title>
            <Box>
                {allData?.map(prev => (
                    <Item key={prev.id} onClick={()=>onclick(prev)}>
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
            <GoBack href="/admine/home">
                관리가 페이지로 돌아가기
            </GoBack>
            {/* 모달창 */}
            <AnimatePresence>{clicked ? 
                    <Overlay 
                        initial={{ opacity : 0}}
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                    >
                        <BigBox>
                            <XMark onClick = {()=>setClicked(prev=>!prev)} icon={faX} />
                            <div>
                                문의 번호 : {clickedInfo?.id}
                            </div>
                            <div>
                                문의자 이름 : {clickedInfo?.name}
                            </div>
                            <div>
                                문의자 이메일 : {clickedInfo?.email}
                            </div>
                            <div>
                                문의자 전화번호 : {clickedInfo?.phoneNumber}
                            </div>
                            <div>
                                문의 내용 : {clickedInfo?.contents}
                            </div>
                            <DeleteBtn onClick = {() => deleteClick(clickedInfo!.id)}>
                                신청서 삭제하기
                            </DeleteBtn>
                        </BigBox>
                    </Overlay> : null}
            </AnimatePresence>
        </Container>
    )
}