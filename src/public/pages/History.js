import { Grid, Container, Col, Input, Table, Button, Row, Badge } from "@nextui-org/react"
import { useState } from "react";

let superData = [
    {
        id: 1,
        name: 'Rafael A. Flores M.',
        user: 'rflores',
        amount: 1500,
        date: new Date().toLocaleDateString(),
        status: 0,
        options: null
    },
    {
        id: 2,
        name: 'Rafael A. Flores M.',
        user: 'rflores',
        amount: 1500,
        date: new Date('2022-09-18').toLocaleDateString(),
        status: 1,
        options: null
    },
    {
        id: 3,
        name: 'Rafael A. Flores M.',
        user: 'rflores',
        amount: 1500,
        date: new Date('2022-08-22').toLocaleDateString(),
        status: 1,
        options: null
    },
    {
        id: 4,
        name: 'Ambar P. Flores M.',
        user: 'aflores',
        amount: 1500,
        date: new Date('2022-08-22').toLocaleDateString(),
        status: 1,
        options: null
    },
];
let searchData = superData;

const searchOnTable = (e,setData) => {
    let value = e.target.value;
    let _data = [];

    if(value.length != 0)
    {
        _data = superData.map(elm => {
            if(elm.user == localStorage.username)
            {
                let str = elm.name + ' ' + elm.date + ' ' + elm.amount;
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
        _data = superData;
    }

    searchData = _data;

    setData(searchData);
}

const drawButtons = () => {
    return (
        <Button.Group flat>
            <Button><i className="fa fa-eye"></i></Button>
            <Button><i className="fa fa-trash"></i></Button>
        </Button.Group>
    )
}

const Estadistics = () => {

    const [data,setData] = useState(superData);

    return(
        <Grid.Container gap={2}>
            <Grid xs></Grid>
            <Grid xs={8}>
                <Container>
                    <Col css={{
                        textAlign: 'center',
                        marginBottom: '2em'
                    }}>
                        <h1>Sección de Proyección</h1>
                        <p>Historico</p>
                        <br />
                        <Input rounded bordered placeholder="Buscar" css={{
                            width: '100%'
                        }} onInput={(e) => searchOnTable(e,setData)} />
                    </Col>
                    <Table 
                    aria-label="Example table with custom cells"
                    bordered 
                    selectionMode="single"
                    css={{
                        minwidth: '100%',
                        height: 'auto'
                    }}>
                        <Table.Header>
                            <Table.Column>Id</Table.Column>
                            <Table.Column>Nombre</Table.Column>
                            <Table.Column>Monto</Table.Column>
                            <Table.Column>Fecha</Table.Column>
                            <Table.Column>Estado</Table.Column>
                            <Table.Column>Options</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {data.map(row => (
                                row.user == localStorage.username && <Table.Row key={row.id}>
                                    <Table.Cell>{ row.id }</Table.Cell>
                                    <Table.Cell>{ row.name }</Table.Cell>
                                    <Table.Cell><Badge variant="dot" color={'warning'} /> { '$'+row.amount }</Table.Cell>
                                    <Table.Cell>{ row.date }</Table.Cell>
                                    <Table.Cell>
                                        <Badge 
                                            color={ row.status == 1 ? 'success' : 'primary' }
                                            variant={'flat'}
                                            >
                                            { row.status == 1 ? 'pagado' : 'pendiente' }
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Row justify="flex-end">
                                            <Button flat auto size={'sm'}><i className="fa fa-eye"></i></Button>
                                            &nbsp;
                                            <Button flat auto color={'error'} size={'sm'}><i className="fa fa-trash"></i></Button>
                                        </Row>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Container>
            </Grid>
            <Grid xs></Grid>
        </Grid.Container>
    )
}

export default Estadistics