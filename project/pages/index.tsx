import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel, Pagination } from "swiper";
import styled from "styled-components";
import Image from "next/image";
import img1 from "/public/image/main_1.png";
import img2 from "/public/image/main_2.png";
import img3 from "/public/image/main_3.png";
import img4 from "/public/image/main_4.png";
import img5 from "/public/image/main_5.png";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Container = styled.div`
    width: 100%;
    height: auto;
    min-width: 1024px;
`

const SwiperBox = styled(Swiper)`
    height: 82vh;
`


export default function Main(){
    return(
        <Container>
            <SwiperBox
                direction={"vertical"}
                slidesPerView={1}
                spaceBetween={50}
                mousewheel={true}
                loop={true}
                pagination={{
                clickable: true,
                }}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false
                }}
                modules={[Autoplay, Mousewheel, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide><Image src={img1} alt="img1" layout='fill' objectFit="cover"/></SwiperSlide>
                <SwiperSlide>
                <Image src={img2} alt="img2" layout='fill' objectFit="cover"/></SwiperSlide>
                <SwiperSlide><Image src={img3} alt="img3" layout='fill' objectFit="cover"/></SwiperSlide>
                <SwiperSlide><Image src={img4} alt="img4" layout='fill' objectFit="cover"/></SwiperSlide>
                <SwiperSlide><Image src={img5} alt="img5" layout='fill' objectFit="cover"/></SwiperSlide>
            </SwiperBox>
        </Container>
    )
}