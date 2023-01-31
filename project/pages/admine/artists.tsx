import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { API, LogAPI, LogImgAPI } from '../../api';
import { useForm } from "react-hook-form";
import Image from "next/image";

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

const FooterBox = styled.div`
    display: flex;
    width: 40vw;
    justify-content: space-between;
`

const GoBack =styled(Link)`
    background-color: black;
    color : white;
    padding: 15px 30px;
    border-radius: 5px;
    margin-top: 1vh;
`

const SetNew =styled.div`
    border: 2px solid black;
    font-weight: 700;
    padding: 15px 30px;
    border-radius: 5px;
    margin-top: 1vh;
    cursor: pointer;
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
        margin: 15px 0px;
    }
`

const XMark = styled(FontAwesomeIcon)`
    font-size: 24px;
    position: absolute;
    top:15px;
    right: 15px;
    cursor: pointer;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    height: 100%;
    span{
        font-size: 14px;
    }
    input{
        padding: 4px;
        padding-left: 2px;
        border: none;
        border-bottom: 2px solid rgba(0,0,0,0.35);
        transition: border-bottom 0.5s;
        width: 60%;
        &:hover{
            border-bottom: 2px solid rgba(0,0,0,1);
            transition: border-bottom 0.5s;
        }
        &:active{
            border-bottom: 2px solid rgba(0,0,0,1);
            transition: border-bottom 0.5s;
        }
    }
`

const Img = styled.img`
    width: 300px;
    height: 300px;
    object-fit: contain;
    margin-bottom: 20px;
`

const Btn = styled.button`
    width: 48%;
    background:#1B1B1B;
    color:#fff;
    border:none;
    position:relative;
    height:40px;
    border-radius: 3px;
    cursor:pointer;
    transition:800ms ease all;
    outline:none;
    &:hover{
        background:#fff;
        color:#1B1B1B;
    }
    &:before, &:after{
        content:'';
        position:absolute;
        top:0;
        right:0;
        height:2px;
        width:0;
        background: #1B1B1B;
        transition:400ms ease all;
    }
    &:after{
        right:inherit;
        top:inherit;
        left:0;
        bottom:0;
    }
    &:hover:before,&:hover:after{
        width:100%;
        transition:800ms ease all;
    }
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
    id : number,
    name: string,
    agency:string,
    contents: string,
    instarGram : string,
    profile: any
}

interface IForm{
    name: string,
    agency:string,
    contents: string,
    instarGram : string,
    profile: any
}

export default function Artists(){
    const [clicked, setClicked] = useState(false);
    const [clickedInfo, setClickedInfo] = useState<IData | null>(null);
    const [allData, setAllData] = useState<IData[]>([]);
    const onclick = (data : IData) => {
        setClicked(prev => !prev);
        setClickedInfo(data);
    }

    // 아티스트 등록
    const [make, setMake] = useState(false);
    const {register, handleSubmit, setValue} = useForm<IForm>();

    const sendImg = async(id : number, result2 : any) => {
        LogImgAPI.post(`/artists/img/${id}`, result2).then(
            response => {
                window.alert(`${response.data.id}번. 성공적으로 등록되었습니다! (30초 이내 등록)`)
            }
        )
        setValue("name", "");
        setValue("agency", "");
        setValue("contents", "");
        setValue("instarGram", "")
        setMake(prev=>!prev);
    }

    const handleValid = async(data : IForm) => {
        const result1 = {
            "name": data.name,
            "agency" : data.agency,
            "contents" : data.contents,
            "instarGram" : data.instarGram,
        }
        try{
            await LogAPI.post('/artists', result1).then(
                response => {
                    const id = response.data.id;
                    const result2 = new FormData();
                    var photoFile:any = document.getElementById("photo");
                    result2.append("profile", photoFile.files[0]);
                    try{
                        sendImg(id, result2);
                    }catch(error){
                        console.log(error)
                    }
                }
            )
        }catch(error){
            console.log(error)
        }
    }

    const handleFaile = () => {
        window.alert("입력한 내용을 다시 확인해주세요!");
    }


    // 전체 데이터 요청
    const getData = async() => {
        try{
            const data = await API.get("/artists");
            setAllData(data.data)
        }catch(error){
            console.log(error)
        }
    }

    // 아티스트삭제
    const deleteClick = async(id : number) => {
        await LogAPI.delete(`/artists/${id}`).then(
            response => {
                window.alert("삭제되었습니다!(1분이내로 삭제)");
            }
        )
        setClicked(prev=>!prev)
    }

    useEffect(()=>{
        getData();
    },[])
    return(
        <Container>
            <Title>아티스트 관리</Title>
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
                            {prev.agency}
                        </div>
                    </Item>
                ))}
            </Box>
            <FooterBox>
                <GoBack href="/admine/home">
                    관리가 페이지로 돌아가기
                </GoBack>
                <SetNew onClick={(()=>setMake(prev=>!prev))}>
                    아티스트 등록하기
                </SetNew>
            </FooterBox>
            {/* 세부 정보 모달창 */}
            <AnimatePresence>{clicked ? 
                    <Overlay 
                        initial={{ opacity : 0}}
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                    >
                        <BigBox>
                            <XMark onClick = {()=>setClicked(prev=>!prev)} icon={faX} />
                            <div>
                                이름 : {clickedInfo?.name}
                            </div>
                            <div>
                                소속사 : {clickedInfo?.agency}
                            </div>
                            <div>
                                자기소개 : {clickedInfo?.contents}
                            </div>
                            <div>
                                인스타그램URL : {clickedInfo?.instarGram}
                            </div>
                            <Img src={clickedInfo?.profile} alt="img"/>
                            <DeleteBtn onClick = {() => deleteClick(clickedInfo!.id)}>
                                아티스트 삭제하기
                            </DeleteBtn>
                        </BigBox>
                    </Overlay> : null}
            </AnimatePresence>


            {/* 새로운 아티스트 등록 모달창 */}
            <AnimatePresence>{make ? 
                    <Overlay 
                        initial={{ opacity : 0}}
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                    >
                        <BigBox>
                            {/* <div onClick = {()=>setMake(prev=>!prev)}>뒤로가기</div> */}
                            <XMark onClick = {()=>setMake(prev=>!prev)} icon={faX} />
                            <Form onSubmit={handleSubmit(handleValid, handleFaile)}>
                                <input {...register("name", {required : true})} placeholder="이름을 적어주세요."/>
                                <input {...register("agency", {required : true})} placeholder="agency을 적어주세요."/>
                                <input {...register("instarGram", {required : true})} placeholder="URL을 적어주세요."/>
                                <input {...register("contents", {required : true, maxLength : 15})} placeholder="내용을 적어주세요."/>
                                <input
                                {...register("profile")}
                                type="file"
                                name="profile"
                                id = "photo"
                                required
                                accept="image/*"
                                multiple
                                />
                                <Btn>등록하기</Btn>
                            </Form>
                        </BigBox>
                    </Overlay> : null}
            </AnimatePresence>
        </Container>
    )
}