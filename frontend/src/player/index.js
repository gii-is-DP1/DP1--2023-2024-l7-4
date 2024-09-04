import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import '../static/css/westernTheme.css';
import tokenService from '../services/token.service';
import jwtDecode from 'jwt-decode';


class PlayerEdit extends Component {


    emptyItem = {
        id: '',
        name: '',
        surname: '',
        avatar: '',
        nickname: '',
        email: '',
        username: '',
        password: '',
    };


    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.jwt = JSON.parse(window.localStorage.getItem("jwt"));
        let pathArray = window.location.pathname.split('/');
        this.username = pathArray[3];
    }

    async componentDidMount() {
        if (this.username !== 'new') {
            const player = await (await fetch(`/api/v1/players/username/${this.username}`, {
                headers: {
                    "Authorization": `Bearer ${this.jwt}`,
                },
            })).json();
            this.setState({ item: player });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;

        await fetch('/api/v1/players/' + item.id, {
            method: 'PUT',
            headers: {
                "Authorization": `Bearer ${this.jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        window.location.href = '/';
    }

    render() {
        const { item } = this.state;
        const title = <h1 className='text-center'> Edit Player</h1>;

        return <div className='admin-page-container'>
            <div className="hero-div">
                {title}
                <Form onSubmit={this.handleSubmit} className='western-form-container2'>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" required name="name" id="name" value={item.name}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Surname</Label>
                        <Input type="text" required name="surname" id="surname" value={item.surname}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="avatar">Avatar</Label>
                        <Input type="text" required name="avatar" id="avatar" value={item.avatar}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="nickname">Nickname</Label>
                        <Input type="text" required name="nickname" id="nickname" value={item.nickname}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="nickname">Email</Label>
                        <Input type="text" required name="email" id="email" value={item.email}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <div className="options-row">
                            <button className="button-container" type="submit">Save</button>
                            <Link className="button-container-bad" to={`/myProfile/${this.username}`}>
                                Cancel
                            </Link>
                            </div>
                    </FormGroup>
                </Form>
            </div>
        </div>
    }
}
export default PlayerEdit;