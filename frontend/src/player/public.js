import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../static/css/westernTheme.css';

class PublicProfileEdit extends Component {

    emptyItem = {
        id: '',
        avatar: '',
        biography: '',
        location: '',
        birthdate: '',
        favoriteGenres: '',
        favoritePlatforms: '',
        favoriteSagas: '',
        profileType: '',
        username: '',
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
        const profileTypes = ['HARDCORE', 'CASUAL']
        const title = <h1 className='text-center'> Public Profile</h1>;

        return <div className='auth-page-container3'>
            <div className="hero-div h6">
                {title}
                <Form onSubmit={this.handleSubmit} className='western-form-container2'>
                    <FormGroup>
                        <Label for="avatar">Avatar</Label>
                        <Input type="text" required name="avatar" id="avatar" value={item.avatar}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="biography">Biography</Label>
                        <Input type="textarea" name="biography" id="biography" value={item.biography}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="location">Location</Label>
                        <Input type="text" required name="location" id="location" value={item.location}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="birthdate">Birthdate</Label>
                        <Input type="date" name="birthdate" id="birthdate" value={item.birthdate}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="favoriteGenres">Favorite Genres</Label>
                        <Input type="text" name="favoriteGenres" id="favoriteGenres" value={item.favoriteGenres}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="favoritePlatforms">Favorite Platforms</Label>
                        <Input type="text" name="favoritePlatforms" id="favoritePlatforms" value={item.favoritePlatforms}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="favoriteSagas">Favorite Sagas</Label>
                        <Input type="text" name="favoriteSagas" id="favoriteSagas" value={item.favoriteSagas}
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="profileType">Profile Type</Label>
                        <Input
                            type="select"
                            name="profileType"
                            id="profileType"
                            value={item.profileType}
                            onChange={this.handleChange}
                        >
                            {profileTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </Input>
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

export default PublicProfileEdit;
