import styled from "styled-components";
import { useForm } from 'react-hook-form';
import { API } from "@/api";
import { useRouter } from "next/router";

const Container = styled.div`
    width: 100vw;
    height: 82vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Helvetica;
    flex-direction: column;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    margin-top: 30px;
`
const FormSection = styled.div`
    position: relative;
    margin-top: 20px;
    margin-bottom: 10px;
`

const Input = styled.input`
    border : none;
    font-size: 18px;
    background-color: #F5F5F5;
    padding: 8px 0px 8px 8px;
    border-radius: 10px;
    width: 260px;
`


const SubBtn = styled.button`
    width : 260px;
    height: 45px;
    border-radius: 10px;
    border: none;
    margin-top: 30px;
    cursor: pointer;
    background-color: rgba(0,0,0,1);
    color: white;
    font-size: 24px;
    font-weight: 600;
`

const Title = styled.h1`
    font-size: 32px;
`

interface ILog{
    id : string;
    pw : string;
}

export default function Admine(){
    const router = useRouter();
    const {register, handleSubmit} = useForm<ILog>();
    const onValid = async(data : ILog) => {
        const result = {
            "memberId": data.id,
            "password": data.pw,
        };
        try{
            await API.post('/login', result).then(
                response => {
                    const acToken =response.data.accessToken
                    sessionStorage.setItem('token', acToken);
                }
            )
            router.push({
                pathname: '/admine/home',
            })
            window.location.reload();
        } catch(error){
            window.alert("문제가 발생하였습니다. 연결상태를 확인해주세요.")
            //console.log(error)
        }
    }

    return(
        <Container>
            <Title>관리자 페이지 로그인</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <FormSection>
                    <Input {...register("id" , {required:true})} placeholder="아이디"></Input>
                </FormSection>
                <FormSection>
                    <Input {...register("pw" , {required:true})} placeholder="비밀번호" type="password"></Input>
                </FormSection>
                <SubBtn>
                    <p>로그인</p>
                </SubBtn>
            </Form>
        </Container>
    )
}