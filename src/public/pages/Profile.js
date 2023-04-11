import { Text, Grid, Container, Col, Card, Image, Input, Row, Button, Divider } from "@nextui-org/react"
import { useEffect, useState } from "react"
import usersData from "../data/users.json"

let user = {};

const getUserSession = (setUser) => {
    usersData.map(u => {
        if(u.api_key == localStorage.token)
        {
            setUser(u);
        }
    });
}

const Profile = () => {

    const [_user,setUser] = useState(user);

    useEffect(() => {
        getUserSession(setUser);
    }, usersData)

    return (
        <Grid.Container gap={2}>
            <Grid xs></Grid>
            <Grid xs={8}>
                <Container>
                    <Col css={{
                        textAlign: 'center',
                        marginBottom: '1em'
                    }}>
                        <Text h1>Sección de perfil</Text>
                        <Text>Edición de datos</Text>                        
                    </Col>
                    <Card css={{
                        mw: '100%'
                    }}>
                        <Card.Header><i className="fa fa-user-circle"></i> &nbsp; Settings</Card.Header>
                        <Card.Body>
                            <Grid.Container gap={2}>
                                <Grid xs>
                                    <Image 
                                    width={320}
                                    height={180}
                                    src="https://github.com/nextui-org/nextui/blob/next/apps/docs/public/nextui-banner.jpeg?raw=true"
                                    alt="Default Image"
                                    objectFit="cover"
                                    ></Image>
                                </Grid>
                                <Grid xs>
                                    <Col>
                                        <Text>Usuario</Text>
                                        <input style={{
                                            fontSize: '25px',
                                            fontWeight: 'bold',
                                            border: 'none'
                                        }} value={_user.username} />
                                        <br />
                                        <br />
                                        <Text>Nombre</Text>
                                        <input style={{
                                            fontSize: '25px',
                                            fontWeight: 'bold',
                                            border: 'none'
                                        }} value={_user.fullname} />
                                    </Col>
                                </Grid>
                            </Grid.Container>
                            <br />
                            <Divider />
                            <br />
                            <Grid.Container gap={2}>
                                <Grid xs={6}>
                                    <Col>
                                        <Text>Contraseña</Text>
                                        <Row justify="space-between" align="center">
                                            <input style={{
                                                fontSize: '25px',
                                                fontWeight: 'bold',
                                                border: 'none',
                                            }} type={'password'} value={_user.password} />
                                            <Button flat auto color={'terciary'}>
                                                <i className="fa fa-eye"></i>
                                            </Button>
                                        </Row>
                                    </Col>
                                </Grid>
                                <Grid xs={6}>
                                    <Col>
                                        <Text>Confirmar</Text>
                                        <Row justify="space-between" align="center">
                                            <input style={{
                                                fontSize: '25px',
                                                fontWeight: 'bold',
                                                border: 'none',
                                            }} type={'password'} value={_user.confirm} />
                                            <Button flat auto color={'terciary'}>
                                                <i className="fa fa-eye"></i>
                                            </Button>
                                        </Row>
                                    </Col>
                                </Grid>
                            </Grid.Container>
                            <br />
                            <Grid.Container gap={2}>
                                <Grid xs={6}>
                                    <Col>
                                        <Text>Email</Text>
                                        <input style={{
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            border: 'none',
                                            width: '100%'
                                        }} value={_user.email} />
                                    </Col>
                                </Grid>
                                <Grid xs={6}>
                                    <Col>
                                        <Text>Api token</Text>
                                        <Text>{_user.api_key}</Text>
                                    </Col>
                                </Grid>
                            </Grid.Container>
                        </Card.Body>
                        <Divider />
                        <Card.Footer>
                            <Container css={{
                                padding: '2em'
                            }}>
                                <Row justify="flex-end">
                                    <Button color={'success'}>
                                        Guardar Cambios &nbsp; <i className="fa fa-send"></i>
                                    </Button>
                                </Row>
                            </Container>
                        </Card.Footer>
                    </Card>
                </Container>
            </Grid>
            <Grid xs></Grid>
        </Grid.Container>
    )
}


export default Profile