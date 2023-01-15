import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper";
import Image from "next/image";
import "swiper/css";

import img1 from "/public/image/test1.png";
import img2 from "/public/image/test2.png";
import img3 from "/public/image/test3.png";
import img4 from "/public/image/test4.png";
import img5 from "/public/image/test5.png";

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
    margin-top: 5vh;
    margin-left: 5%;
`

const Img = styled(Image)`
    height: 250px;
    object-fit: contain;
    width: fit-content;
`

export default function Artworks(){
    const router = useRouter();

    // 어떤 카테고리 선택
    const num = router.query.id === undefined ? 1 : router.query.id ;
    const [cate, setCate] = useState(num);
    console.log(cate);
    const cateClick = (id : number) => {
        setCate(id);
    }
    
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
                slidesPerView={4}
                className="mySwiper"
                mousewheel={true}
                keyboard={true}
                grabCursor={true}
                modules={[Mousewheel]}
            >
                <SwiperSlide style={{width:"fit-content"}}><Img src={img1} alt="img1"/></SwiperSlide>
                <SwiperSlide style={{width:"fit-content"}}><Img src={img2} alt="img2"/></SwiperSlide>
                <SwiperSlide style={{width:"fit-content"}}><Img src={img3} alt="img3"/></SwiperSlide>
                <SwiperSlide style={{width:"fit-content"}}><Img src={img4} alt="img4"/></SwiperSlide>
                <SwiperSlide style={{width:"fit-content"}}><Img src={img5} alt="img5"/></SwiperSlide>
            </ItemBox>
        </Container>
    )
}