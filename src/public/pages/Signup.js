import { Card, Divider, Grid, Text, Row, Col, Container, Input, Image, Button, Link, Loading } from "@nextui-org/react"
import { useState } from "react";
import SignupBK from '../images/signup-bk.jpg'

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

    if(data.password != data.confirm)
    {
        swal({
            title: 'las contraseñas no coinciden',
            text: '',
            icon: 'error'
        });
        return false;
    }

    if(verify)
    {
        setShow(true);
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

const sendDataIntoServer = (data,setShow) => {

    fetch('http://localhost:8000/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(rs => rs.json()).then(rs => {

        setShow(false)

        if(rs.action != false)
        {
            swal({
                title: rs.msg,
                text: new Date().toDateString(),
                icon: 'success',
                closeOnEsc: false,
                closeOnClickOutside: false
            }).then(rs => {
                if(rs)
                {
                    goTologin();
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

    });

}

const getFields = () => {

    let col = document.getElementById('elements-col');
    let fields = col.querySelectorAll('input');

    return fields

}

const goTologin = () => {

    window.location.href = './';

}

const Signup = () => {

    const [show,setShow] = useState(showModal)  

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
                <Grid xs={8}>
                    <Card>
                        <Card.Body>
                            <Grid.Container gap={2} justify={'space-between'}>
                                <Grid xs>
                                    <Col id="elements-col">
                                        <Text size={'26px'} weight={'bold'}>Sign Up</Text>
                                        <Text css={{
                                            marginBottom: '0.5em'
                                        }}>Complete los Campos &nbsp; <i className="fa fa-address-card"></i></Text>
                                        <br />
                                        <Input name="username" labelPlaceholder="usuario" bordered clearable css={{ width: '100%' }} />
                                        <br />
                                        <br />
                                        <Input name="password" labelPlaceholder="contraseña" type={'password'} bordered clearable css={{ 
                                            width: '100%',
                                            marginTop: '0.8em',
                                        }} 
                                        />
                                        <br />
                                        <br />
                                        <Input name="confirm" labelPlaceholder="confirmar contraseña" type={'password'} bordered clearable css={{ 
                                            width: '100%',
                                            marginTop: '0.8em',
                                        }} 
                                        />
                                        <br />
                                        <br />
                                        <Input name="fullname" labelPlaceholder="nombre completo" bordered clearable css={{ 
                                            width: '100%',
                                            marginTop: '0.8em',
                                        }} 
                                        />
                                        <br />
                                        <br />
                                        <Input name="build" labelPlaceholder="edificio" bordered clearable css={{ 
                                            width: '100%',
                                            marginTop: '0.8em',
                                        }} 
                                        />
                                        <br />
                                        <br />
                                        <Input name="email" labelPlaceholder="email" type={'mail'} bordered clearable css={{ 
                                            width: '100%',
                                            marginTop: '0.8em',
                                        }} 
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
                                            <Button auto color={'secondary'} onPress={() => verifyData(setShow)}>continuar &nbsp; <i className="fa fa-send"></i></Button>
                                            &nbsp;
                                            <Button auto bordered color={'secondary'} onPress={() => goTologin()}>ir al login &nbsp; <i className="fa fa-user-circle"></i></Button>
                                        </Row>
                                        <br />
                                    </Col>
                                </Grid>
                                <Grid xs>
                                    <Image
                                        width={'100%'}
                                        height={'100%'}
                                        src={SignupBK}
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

export default Signup