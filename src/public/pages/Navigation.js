import { Navbar, Button, Text, Badge, Avatar, Dropdown, Divider, Row, Col } from "@nextui-org/react"
import { useEffect, useState } from "react";

let countNotification = 0;

const eventChange = (evt) => {
    if(evt == 'logout')
    {
        swal({
            title: '¿Desea cerrar sesión?',
            text: new Date().toDateString(),
            icon: 'info',
            buttons: ['cancelar','salir'],
            closeOnEsc: false,
            closeOnClickOutside: false
        }).then(click => {
            if(click)
            {
                delete localStorage.token;
                delete localStorage.fullname;
                delete localStorage.username;
        
                setTimeout(() => {
                    window.location.href = './';
                }, 1000);
            }
        })
    }
    else if(evt == 'profile')
    {
        window.location.href = '/profile';
    }
}

const defineNavigation = (e) => {

    let str = e.target.innerText.toLowerCase() || e.target.id;

    Object.assign(localStorage,{
        section: str
    })

    switch(str)
    {
        case 'inicio': 
                window.location.href = '/';
            break;
        case 'historial': 
                window.location.href = '/historial';
            break;
        case 'comunicados': 
                window.location.href = '/comunicados';
            break;
        case 'notifications': 
                window.location.href = '/notifications';
            break;
    }
}

const NavigationSetMark = () => {

    const contentNavigation = document.getElementById('content-navigation');
    const links = contentNavigation.querySelectorAll('li a');
          links.forEach(a => {
                if(a.innerText.toLowerCase() == localStorage.section)
                {
                    a.style.fontWeight = 'bold !important';
                }
          });

}

const loadNotifications = (setData) => {
    fetch('http://localhost:8000/get-notifications?user=' + localStorage.username ,{
        headers: {
            'Content-type': 'application/json'
        }
    }).then(rs => rs.json()).then(rs => {

        if(rs.action != false)
        {
            let date = new Date().toLocaleDateString();
            rs.data.map(el => {
                if(el.date == date)
                {
                    countNotification++;
                }
            })
            setData(countNotification);
        }

    })
}

const MainNavigation = () => {

    const loggin = localStorage.token != undefined ? true : false;
    const section = localStorage.section;

    const [_notifications, setNotifications] = useState(countNotification);

    useEffect(() => {
        loadNotifications(setNotifications);
    },countNotification)

    return (
        <Navbar variant={'sticky'} css={{
            display: loggin ? 'flex' : 'none'
        }}>
            <Navbar.Brand>
                <Text hideIn="xs" weight={'bold'}>
                    <i className="fa fa-cube"></i> Sis ReAdmin
                </Text>
            </Navbar.Brand>
            <Navbar.Content id="content-navigation"
                enableCursorHighlight 
                hideIn="xs" 
                variant="highlight-rounded"
            >
                <Navbar.Link onPress={(e) => defineNavigation(e)}>Inicio</Navbar.Link>
                <Navbar.Link onPress={(e) => defineNavigation(e)}>Historial</Navbar.Link>
                <Navbar.Link onPress={(e) => defineNavigation(e)}>Comunicados</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content css={{
                display: loggin ? 'none' : 'block'
            }}>
                <Navbar.Item>
                    <Button auto shadow color={'default'}>
                        <i className="fa fa-info-circle"></i>
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
            <Navbar.Content css={{
                display: loggin ? 'flex' : 'none'
            }}>
                <Navbar.Item>
                    <Badge content={_notifications != 0 && _notifications} color={'error'}>
                        <Button id='notifications' onPress={(e) => defineNavigation(e)}
                        rounded 
                        auto 
                        flat
                        color={'terciary'}
                        >
                            <i className="fa fa-bell"></i>
                        </Button>
                    </Badge>
                </Navbar.Item>
                <Dropdown placement="bottom-right">
                    <Navbar.Item>
                        <Badge
                        content=""
                        color="success"
                        placement="bottom-right"
                        shape="circle"
                        variant="dot"
                        size="md"
                        >
                        <Dropdown.Trigger>
                            <Avatar
                            bordered
                            as="button"
                            color="gradient"
                            text={ loggin && localStorage.username.substr(0,2).toUpperCase() }
                            textColor={'white'}
                            key={'circle-avatar'}
                            />
                        </Dropdown.Trigger>
                        </Badge>
                    </Navbar.Item>
                    <Dropdown.Menu
                    aria-label="User menu actions"
                    color="primary"
                    onAction={(actionKey) => eventChange(actionKey)}
                    >
                    <Dropdown.Item css={{ height: "$18" }}>
                        <Row align="center">
                            <Avatar
                                bordered
                                as="button"
                                color="secondary"
                                text={ loggin && localStorage.username.substr(0,2).toUpperCase() }
                                textColor={'white'}
                            />
                            &nbsp;
                            <Col>
                                <Text color="inherit">
                                    Sesion iniciada como:
                                </Text>
                                <Text b color="inherit">
                                    { localStorage.fullname }
                                </Text>
                            </Col>
                        </Row>
                    </Dropdown.Item>
                    <Dropdown.Item key="profile" withDivider>
                        <i className="fa fa-user-circle"></i> Perfil
                    </Dropdown.Item>
                    <Dropdown.Item key="logout" withDivider color="error">
                        <i className="fa fa-sign-out"></i> Salir
                    </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Navbar.Content>
      </Navbar>
    );
}

export {
    MainNavigation
}