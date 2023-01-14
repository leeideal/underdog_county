import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 66vh;
    padding: 0 120px;
    display: flex;
    margin-top: 16vh;
    min-width: 1024px;
    max-width: 1700px;
    overflow-y: scroll;
    justify-content: space-between;
`

const Info = styled.div`
    display: flex;
    flex-direction: column;
    height: 50vh;
    width: 50%;
    justify-content: space-between;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    height: 34%;
    justify-content: space-between;
    h1{
        font-family: 'Times New Roman', Times, serif;
        font-size: 70px;
    }
    h6{
        font-size: 14px;
    }
`

const Tail = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15%;
    height: 41%;
    justify-content: space-between;
`

const Item = styled.div`
    display: flex;
    align-items: center;
    h6{
        width: 100px;
    }
    font-weight: 200;
`

const Form = styled.form`
    padding-top: 11vh;
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 60vh;
    justify-content: space-between;
    span{
        font-size: 14px;
    }
    input{
            margin-top: 8px;
            padding: 4px;
            padding-left: 2px;
            border: none;
            border-bottom: 2px solid rgba(0,0,0,0.35);
            transition: border-bottom 0.5s;
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

const First = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div{
        width : 47%;
        display: flex;
        flex-direction: column;
    }
`

const Second = styled.div`
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: column;
`
const Third = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    height: 40%;
    textarea{
        margin-top: 8px;
        padding: 4px;
        padding-left: 2px;
        height: 90%;
        border: none;
        border-bottom: 2px solid rgba(0,0,0,0.35);
        transition: border-bottom 0.5s;
        &:hover{
            border-bottom: 2px solid rgba(0,0,0,1);
            transition: border-bottom 0.5s;
        }
        &:active{
            border-bottom: 2px solid rgba(0,0,0,1);
            transition: border-bottom 0.5s;
        }
        resize:none;
    }
`

const Btn = styled.button`
    width: 48%;
    align-self: flex-end;
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

interface IForm{
    name : string;
    phone : string;
    mail : string;
    content : string;
}

export default function Contact(){
    // 문의 전송 관련
    const {register, handleSubmit, formState} = useForm<IForm>();
    const handleValid = (data : IForm) => {
        
    }

    const handleFaile = () => {
        window.alert("입력한 내용을 다시 확인해주세요!");
    }

    // 나머지 작업
    
    
    return(
        <Container>
            <Info>
                <Title>
                    <h1>Contact Us</h1>
                    <h6>협업 문의 또는 궁금한 점이 있다면 우측 양식을 제출해주세요.</h6>
                </Title>
                <Tail>
                    <Item>
                        <h6>CEO</h6>
                        <span style={{fontWeight : 400}}>한승훈</span>
                    </Item>
                    <Item>
                        <h6>Phone</h6>
                        <span>010 - 9460 - 5088</span>
                    </Item>
                    <Item>
                        <h6>E-mail</h6>
                        <span>underdogcounty@gamil.com</span>
                    </Item>
                    <Item>
                        <h6>Instagram</h6>
                        <span>@labongabong</span>
                    </Item>
                    <Item>
                        <h6>Kakao Talk</h6>
                        <span>https://open.kakao.com/o/sm8hleSe</span>
                    </Item>
                </Tail>
            </Info>
            <Form onSubmit={handleSubmit(handleValid, handleFaile)}>
                <First>
                    <div>
                        <span>성함*</span>
                        <input {...register("name", {required : true})} placeholder="이름을 적어주세요."/>
                    </div>
                    <div>
                        <span>전화번호</span>
                        <input {...register("phone")} placeholder="010-0000-0000"/>
                    </div>
                </First>
                <Second>
                    <span>이메일*</span>
                    <input {...register("mail", {required : true, pattern : {
                        value : /^[A-Za-z0-9._%+-]+@+[A-Za-z0-9._%+-]+.+[A-Za-z0-9._%+-]/,
                        message : "이메일 입력 형식을 확인해주세요."
                    }})} placeholder="이메일을 적어주세요."/>
                </Second>
                <Third>
                    <span>문의내용*</span>
                    <textarea {...register("content", {required : true})} placeholder="문의내용을 적어주세요."/>
                </Third>
                <Btn>문의하기</Btn>
            </Form>
        </Container>
    )
}