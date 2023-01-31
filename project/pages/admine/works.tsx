import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { API, LogAPI, LogImgAPI } from '../../api';
import { useForm } from "react-hook-form";

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

const FooterBox = styled.div`
    display: flex;
    width: 40vw;
    justify-content: space-between;
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

const BigBox = styled(motion.form)`
    width: 50vw;
    height: 80vh;
    border-radius: 20px;
    position: relative;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
const Btn = styled.button`
    margin-top: 70px;
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

const Img = styled.img`
    width: 400px;
    height: 400px;
    object-fit: contain;
    margin-bottom: 20px;
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
    category : string,
    image : string
}

interface IForm{
    category : string,
    image : string
}

export default function Works(){
    const [clicked, setClicked] = useState(false);
    const [clickedInfo, setClickedInfo] = useState<IData | null>(null);
    const [allData, setAllData] = useState<IData[]>([]);
    const onclick = (data : IData) => {
        setClicked(prev => !prev);
        setClickedInfo(data);
    }

    const sendImg = async(id : number, result2 : any) => {
        LogImgAPI.post(`/works/img/${id}`, result2).then(
            response => {
                window.alert(`${response.data.id}번. 성공적으로 등록되었습니다! (30초 이내 등록)`);
                setMake(prev=>!prev);
            }
        )
    }

    // 아티스트 등록
    const [make, setMake] = useState(false);
    const {register, handleSubmit, formState} = useForm<IForm>();
    const handleValid = async(data : IForm) => {
        const result1 = {
            "category" : data.category.toUpperCase(),
        }
        if(data.category === "video"){
            window.alert("video등록 안됨");
            setMake(prev=>!prev);
            return;
        }
        try{
            await LogAPI.post('/works', result1).then(
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
            const data = await API.get("/works/");
            setAllData(data.data)
        }catch(error){
            console.log(error)
        }
    }

    // 아티스트삭제
    const deleteClick = async(id : number) => {
        await LogAPI.delete(`/works/${id}`).then(
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
            <Title>작업물 관리</Title>
            <Box>
            {allData?.map(prev => (
                    <Item key={prev.id} onClick={()=>onclick(prev)}>
                        <div>
                            {prev.id}
                        </div>
                        <div>
                            {prev.category}
                        </div>
                    </Item>
                ))}
            </Box>
            <FooterBox>
                <GoBack href="/admine/home">
                    관리가 페이지로 돌아가기
                </GoBack>
                <SetNew onClick={(()=>setMake(prev=>!prev))}>
                    작업물 등록하기
                </SetNew>
            </FooterBox>
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
                                Category : {clickedInfo?.category}
                            </div>
                            <Img src={clickedInfo?.image} alt="img"/>
                            <DeleteBtn onClick = {() => deleteClick(clickedInfo!.id)}>
                                작업물 삭제하기
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
                        <BigBox onSubmit={handleSubmit(handleValid, handleFaile)}>
                            <XMark onClick = {()=>setMake(prev=>!prev)} icon={faX} />
                            <fieldset>
                                <legend>1. 사진의 카테고리를 선택해주세요</legend>

                                <label htmlFor="file-commercial">
                                <input
                                    {...register("category")}
                                    type="radio"
                                    value="commercial"
                                    id="file-commercial"
                                />
                                    commercial
                                </label>
                                <label htmlFor="field-snap">
                                    <input
                                        {...register("category")}
                                        type="radio"
                                        value="snap"
                                        id="field-snap"
                                    />
                                    snap
                                </label>
                                <label htmlFor="field-video">
                                    <input
                                        {...register("category")}
                                        type="radio"
                                        value="video"
                                        id="field-video"
                                    />
                                    video
                                </label>
                                <label htmlFor="field-product">
                                    <input
                                        {...register("category")}
                                        type="radio"
                                        value="product"
                                        id="field-product"
                                    />
                                    product
                                </label>
                                <label htmlFor="field-profile">
                                    <input
                                        {...register("category")}
                                        type="radio"
                                        value="profile"
                                        id="field-profile"
                                    />
                                    profile
                                </label>
                            </fieldset>
                            <div style={{marginTop : "40px"}}>
                            <legend>2. 업로드할 사진을 선택해주세요</legend>
                            <input
                            {...register("image")}
                            type="file"
                            name="profile"
                            id = "photo"
                            required
                            multiple
                            />
                            </div>
                            
                            <Btn>등록하기</Btn>
                        </BigBox>
                    </Overlay> : null}
            </AnimatePresence>
        </Container>
    )
}