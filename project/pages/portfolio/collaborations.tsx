import styled from "styled-components";
import img1 from "/public/image/test1.png";
import Image from "next/image";
import Link from "next/link";
import { API } from '../../api';
import { useEffect, useState } from "react";

const Container = styled.div`
    width: 100%;
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
    display: flex;
    margin-top: 60px;
    flex-direction: column;
    overflow-y: hidden;
    width: 90%;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom : 2px solid gray;
    margin-bottom: 80px;
    padding-bottom: 80px;
    &:last-child{
        border-bottom : none;
        margin-bottom: 100px;
    }
`

const Detail = styled.div`
    width: 50%;
`

const Img = styled.img`
    height: 370px;
    width : 80%;
    object-fit: contain;
    width: fit-content;
`

const Name = styled.div`
    h1{
        font-size: 52px;
        margin-bottom: 2px;
    }
    h6{
        font-size: 18px;
        font-weight: 400;
    }
    margin-bottom: 30px;
`
const Content = styled.div`
    margin-bottom: 25px;
    font-size: 18px;

`

const MoreInfo =styled(Link)`
    background-color: black;
    color : white;
    padding: 15px 30px;
    border-radius: 5px;
`

interface IData{
    id : number,
    name: string,
    agency:string,
    contents: string,
    instarGram : string,
    profile: any
}

export default function Collaborations(){
    const [allData, setAllData] = useState<IData[]>([]);

    // 전체 데이터 요청
    const getData = async() => {
        try{
            const data = await API.get("/artists");
            setAllData(data.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        getData();
    },[])

    return(
        <Container>
            <Title>Collaborations</Title>
            <Info>
                {allData.map(i => (
                    <Item key={i.id}>
                        <Img src={`${i.profile}`} alt="img"/>
                        <Detail>
                            <Name>
                                <h1>{i.name}</h1>
                                <h6>{i.agency}</h6>
                            </Name>
                            <Content>
                                {i.contents}
                            </Content>
                            <MoreInfo href={`https://${i.instarGram}`}>
                                More
                            </MoreInfo>
                        </Detail>
                    </Item>
                ))}
            </Info>
        </Container>
    )
}