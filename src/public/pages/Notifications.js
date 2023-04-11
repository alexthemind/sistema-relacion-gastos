import { Container, Grid, Col, Collapse, Text, Avatar, Link, Card, Row, Button, Badge, Input } from "@nextui-org/react"
import { useEffect, useState } from "react"
//import notificationData from '../data/notifications.json'

let notificationData = [];
let searchData = [];

const loadNotifications = (setData) => {
    fetch('http://localhost:8000/get-notifications?user=' + localStorage.username ,{
        headers: {
            'Content-type': 'application/json'
        }
    }).then(rs => rs.json()).then(rs => {

        if(rs.action != false)
        {
            notificationData = rs.data;
            searchData = notificationData;
            setData(notificationData);
        }

    })
}

const searchOnTable = (e,setData) => {
    let value = e.target.value;
    let _data = [];

    if(value.length != 0)
    {
        _data = notificationData.map(elm => {
            if(elm.username == localStorage.username)
            {
                let str = elm.title + ' ' + elm.date + ' ' + elm.description;
                let val = str.match(new RegExp(value,'i'));
    
                if(val)
                {
                    return elm;
                }
            }
        }).filter(el => el);
    }
    else
    {
        _data = notificationData;
    }

    searchData = _data;

    setData(searchData);
}

const Notifications = () => {
    const [data,setData] = useState(notificationData)
    const date = new Date().toLocaleDateString();

    useEffect(() => {
        loadNotifications(setData);
    },notificationData)

    return(
        <Grid.Container gap={2}>
            <Grid xs></Grid>
            <Grid xs={8}>
                <Container>
                    <Col css={{
                        textAlign: 'center',
                        marginBottom: '1em',
                    }}>
                        <h1>Notificaciones</h1>
                        <br />
                        <Input rounded bordered placeholder="Buscar" css={{
                            width: '100%'
                        }} onInput={(e) => searchOnTable(e,setData)} />
                    </Col>
                    <Row justify="center">
                        <Text h4>Lista de contenido</Text>
                    </Row>
                    <Grid.Container gap={2}>
                        <Grid xs></Grid>
                        <Grid xs={10}>
                            <Col>
                                { data.length != 0 ? data.map((el,i) => (
                                    <Collapse 
                                    title={ el.date == date ? <Badge
                                        content={<span>Nuevo <i className="fa fa-check-circle"></i></span>} 
                                        color={"error"} 
                                        placement={"top-right"} 
                                        size={"xs"}
                                        css={{ marginTop: '-0.7em !important' }}
                                        >
                                            <Text h3>{ el.title }</Text>
                                        </Badge> : el.title } 
                                    subtitle={ el.date }
                                    contentLeft={<i className="fa fa-bell"></i>}
                                    bordered
                                    key={'collapse-' + i}
                                    css={{ marginBottom: '1em' }}
                                    >
                                        <Text>{ el.description }</Text>
                                    </Collapse>
                                )) : <Row justify="center">
                                    <Text h3>No hay datos</Text>
                                </Row> }
                            </Col>
                        </Grid>
                        <Grid xs></Grid>
                    </Grid.Container>
                </Container>
            </Grid>
            <Grid xs></Grid>
        </Grid.Container>
    )
}

export default Notifications