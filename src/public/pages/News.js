import { Container, Grid, Col, Collapse, Text, Avatar, Link, Card, Row, Button, Badge } from "@nextui-org/react"
import { useState } from "react"
import comunicationData from '../data/comunications.json'


const News = () => {

    const [data,setData] = useState(comunicationData);

    return(
        <Grid.Container gap={2}>
            <Grid xs></Grid>
            <Grid xs={8}>
                <Container>
                    <Col css={{
                        textAlign: 'center'
                    }}>
                        <Row justify="space-between" align="center">
                            <h1>Comunicados</h1>
                            <span></span>
                            <Button auto color={'success'}>
                                Agregar comunicación &nbsp; <i className="fa fa-book"></i>
                            </Button>
                        </Row>
                    </Col>
                    <Grid.Container gap={2}>
                        <Grid xs={4}></Grid>
                        <Grid xs={4} justify={'center'}>
                            {data.length != 0 ? data.map(row => (
                                <Card>1</Card>
                            )) : 
                            <Text h3>No tenemos noticias</Text>}
                        </Grid>
                        <Grid xs={4}></Grid>
                    </Grid.Container>
                </Container>
            </Grid>
            <Grid xs></Grid>
        </Grid.Container>
    )
}

export default News