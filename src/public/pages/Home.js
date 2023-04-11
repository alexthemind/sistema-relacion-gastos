import { Grid, Container, Row, Card, Col, Button, Divider,Text } from "@nextui-org/react"
import myPhoto from '../images/option.jpg'

const Home = () => {

    const drawCard = (title,icon) => {
        return(
            <Card>
                <Card.Header>
                    <Container>
                        <p style={{ fontWeight: 'bold' }}>{ title }</p>
                    </Container>
                </Card.Header>
                <Card.Body>
                    <Text align='center'>
                        <i className={ icon + " fa-5x"}></i>
                    </Text>
                    <br />
                    <Container css={{
                        padding: '0 1.5em'
                    }}>
                        <Text align='center' css={{
                            fontSize: '11px'
                        }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                    </Container>
                </Card.Body>
                <Card.Footer>
                    <Container css={{ padding: '1em' }}>
                        <Row justify="center" align="center">
                            <Button square color={'gradient'}>
                                Entrar
                            </Button>
                        </Row>
                    </Container>
                </Card.Footer>
            </Card>
        )
    }

    return(
        <Grid.Container gap={2}>
            <Grid xs></Grid>
            <Grid xs={8}>
                <Container>
                    <Col css={{
                        textAlign: 'center'
                    }}>
                        <h1>Bienvenidos elija una opción</h1>
                        <p>Las opciones se ajustan a los requerimientos de lugar</p>
                    </Col>
                    <Grid.Container gap={2}>
                        <Grid xs={6}>{ drawCard('ABONAR','fa fa-usd') }</Grid>
                        <Grid xs={6}>{ drawCard('RECLAMAR','fa fa-volume-control-phone') }</Grid>
                        <Grid xs={6}>{ drawCard('HISTORIAL','fa fa-list') }</Grid>
                        <Grid xs={6}>{ drawCard('PROYECCION','fa fa-bar-chart') }</Grid>
                    </Grid.Container>
                </Container>
            </Grid>
            <Grid xs></Grid>
        </Grid.Container>
    )
}

export default Home