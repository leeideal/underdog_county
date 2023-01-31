import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import "swiper/css";
import { API } from '../../api';

const Container = styled.div`
    width: 100vw;
    height: 66vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16vh;
    min-width: 1024px;
    max-width: 1800px;
`

const Category = styled.div`
    margin-top: 20px;
    display: flex;
    align-items: center;
    width: 55%;
    justify-content: space-between;
`

const CateItem = styled.div<{isActive : boolean}>`
    font-family: 'Times New Roman', Times, serif;
    font-size: 20px;
    border-bottom: ${props => props.isActive ? "1px solid black" : null};
    opacity: ${props => props.isActive ? 1 : 0.4};
    transition: all 0.4s;
    &:hover{
        opacity: 1;
        transition: opacity 0.4s;
    }
    cursor: pointer;
`

const cateList = [{id : 1, name : "Commercial"}, {id : 2, name : "Snap"}, {id : 3, name : "Video"}, {id : 4, name : "Product"}, {id : 5, name : "Profile"}]

// IMG SWIPER
const ItemBox = styled(Swiper)`
    width: 95%;
    margin-top: 10vh;
    margin-left: 5%;
`

const Img = styled.img`
    height: 250px;
    object-fit: contain;
    width: fit-content;
    margin: 0px 50px;
`

interface IData{
    id : number,
    category : string,
    image : string
}

export default function Artworks(){
    const router = useRouter();
    const [cate, setCate] = useState();

    // 어떤 카테고리 선택
    const cateClick = async(id : any) => {
        if(id === 3){
            router.push("/video");
        }else{
            setCate(id);
            try{
                const num = cateList[id-1].name.toUpperCase();
                const data = await API.get(`/category/${num}`);
                setAllData(data.data)
            }catch(error){
                console.log(error)
            }
        }
    }

    // 전체 데이터 요청
    const [allData, setAllData] = useState<IData[]>([]);
    const getData = async(num : any) => {
        try{
            const id = cateList[num-1].name.toUpperCase();
            const data = await API.get(`/category/${id}`);
            setAllData(data.data)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        // 어떤 카테고리 선택
        const num : any = router.query.id === undefined ? 1 : router.query.id ;
        setCate(num);
        getData(num);
    },[])
    
    console.log(allData);

    return(
        <Container>
            <Category>
                {cateList.map(prev => (
                    <CateItem onClick={()=>cateClick(prev.id)} key={prev.id} isActive={prev.id == cate}>
                        {prev.name}
                    </CateItem>
                ))}
            </Category>
            <ItemBox
                slidesPerView={3.2}
                className="mySwiper"
                mousewheel={true}
                keyboard={true}
                grabCursor={true}
                modules={[Mousewheel]}
            >
                {allData?.map(prev => (
                    <SwiperSlide key={prev.id} style={{width:"fit-content"}}><Img src={prev.image}/></SwiperSlide>
                ))}
            </ItemBox>
        </Container>
    )
}