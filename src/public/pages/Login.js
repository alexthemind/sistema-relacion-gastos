import { Card, Divider, Grid, Text, Row, Col, Container, Input, Image, Button, Link, Loading } from "@nextui-org/react"
import { useEffect, useState } from "react";
//import LoginBK from '../images/login-bk.jpg'
import Http from "../services/Services";

let showModal = false;

const verifyData = (setShow) => {
    let fields = getFields();
    let data = {};
    let verify = true;

    fields.forEach(elm => {
        if(elm.value.length != 0)
        {
            data[elm.name] = elm.value;
        }
        else
        {
            verify = false;
        }
    });

    if(verify)
    {
        //setShow(true);
        sendDataIntoServer(data,setShow);
    }
    else
    {
        swal({
            title: 'lo sentimos, debe completar los campos',
            text: '',
            icon: 'error'
        })
    }

}

const getFields = () => {

    let col = document.getElementById('elements-col');
    let fields = col.querySelectorAll('input');

    return fields

}

const sendDataIntoServer = (data,setShow) => {

    fetch(Http.host + '/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(rs => rs.json()).then(rs => {

        if(rs.action != false)
        {
            Object.assign(localStorage,{
                token: rs.token,
                username: rs.username,
                fullname: rs.fullname
            });

            //setShow(false)

            swal({
                title: rs.msg,
                text: new Date().toDateString(),
                icon: 'success',
                closeOnEsc: false,
                closeOnClickOutside: false
            }).then(clic => {
                if(clic)
                {
                    window.location.reload();
                }
            })

        }
        else
        {
            swal({
                title: rs.msg,
                text: '',
                icon: 'error'
            })
        }

    }).catch(c => {

        swal({
            title: 'Lo sentimos, no se pudo entregar la solicitud',
            text: '',
            icon: 'error'
        })

    });

}

const goToSignup = () => {

    window.location.href = '/signup';

}

const Login = () => {

    const [show,setShow] = useState(showModal);

    return(
        <div>
            <div id="loader" style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(255,255,255,.7)',
                zIndex: 99999,
                top: 0,
                left: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                visibility: show != false ? 'visible' : 'hidden',
                opacity: show != false ? 1 : 0,
                transition: 'all .3s ease-in-out'
            }}>
                <Loading loadingCss={{ $$loadingSize: "100px", $$loadingBorder: "10px" }} />
            </div>
            <Grid.Container gap={2} alignItems={'center'} alignContent={'center'} css={{
                marginTop: '2em'
            }}>
                <Grid xs></Grid>
                <Grid xs={8} justify={'center'}>
                    <Card>
                        
                        <Card.Body>
                            <Grid.Container gap={2} justify={'space-between'}>
                                <Grid xs={5}>
                                    <Col id="elements-col">
                                        <Text size={'26px'} weight={'bold'}>Login</Text>
                                        <Text css={{
                                            marginBottom: '0.5em'
                                        }}>Complete los Campos &nbsp; <i className="fa fa-user-circle"></i></Text>
                                        <br />
                                        <Input name="username" labelPlaceholder="usuario" bordered clearable css={{ width: '100%' }} value={'rflores'} />
                                        <br />
                                        <br />
                                        <Input name="password" labelPlaceholder="contraseña" type={'password'} bordered clearable css={{ 
                                            width: '100%',
                                            marginTop: '0.8em',
                                        }} value={'Pro.123.'} 
                                        />
                                        <br />
                                        <br />
                                        <Row>
                                            <Text size={'14px'}>
                                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                            </Text>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Button auto onClick={() => verifyData(setShow)}>continuar &nbsp; <i className="fa fa-send"></i></Button>
                                            &nbsp;
                                            <Button auto bordered onClick={() => goToSignup()}>registro &nbsp; <i className="fa fa-address-card"></i></Button>
                                        </Row>
                                        <br />
                                        <Row>
                                            <Link href="#">¿Olvidaste tu contraseña?</Link>
                                        </Row>
                                    </Col>
                                </Grid>
                                <Grid xs={6}>
                                    <Image
                                            width={'100%'}
                                            height={'100%'}
                                            src={ Http.host + '/images/login-bk.jpg'}
                                            alt="Default Image"
                                            objectFit="cover"
                                            css={{
                                                borderRadius: '20px'
                                            }}
                                    />
                                </Grid>
                            </Grid.Container>
                        </Card.Body>
                        <Divider />
                        <Card.Footer>
                            <Row justify="center">
                                <Text size={'12px'}>
                                    CopyRight© Rafael A. Flores M. 2022
                                </Text>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Grid>
                <Grid xs></Grid>
            </Grid.Container>
        </div>
    )
}

export default Login