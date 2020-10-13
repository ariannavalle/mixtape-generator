import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Search from '../Search/Search'
import Tracklist from '../Tracklist/Tracklist'

export default class SearchTrackListContainer extends Component {
    state = {
        query: '',
        results: {},
        trackIDs: [],
        recommendations: [],
    }

    auth = {
        username: '',
        password: ''
    }

    componentDidMount = async () => {

        const headers = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: this.auth.username,
                password: this.auth.password,
            },
        };
        const data = {
            grant_type: 'client_credentials',
        };
        this.tokenResponse = await axios.post('https://accounts.spotify.com/api/token', qs.stringify(data), headers)
    }


    onChange = (event) => {
        const query = event.target.value;

        if (!query) {
            this.setState({ query, results: {}, });
        } else {
            this.setState({ query }, () => {
                this.getResults(query);
            });
        }
    };

    getResults = (query) => {
        axios.get(`https://api.spotify.com/v1/search?query=${this.state.query}&type=track&limit=5`, {
            headers: {
                Authorization: `Bearer ${this.tokenResponse.data.access_token}`
            },
        }).then((songs) => {
            this.setState({
                results: songs.data.tracks.items,
            });
        })
            .catch((error) => {
                console.log('Failed to get search results.')

            });
    };

    getrecommendations = () => {
        axios.get(`https://api.spotify.com/v1/recommendations?seed_tracks=${this.state.trackIDs}`, {
            headers: {
                Authorization: `Bearer ${this.tokenResponse.data.access_token}`
            }
        }).then((recs) => {
            this.setState({
                recommendations: recs.data.tracks,
            })
        }).catch((error) => {
            console.log('Failed to get recommendations.')

        });
    }

    addToSeedList = async (id) => {
        await this.setState({
            trackIDs: [...this.state.trackIDs, id],
            // this will close the search dropdown once the user makes a choice
            results: {},
        })
        this.getrecommendations()
    }

    render() {
        return (
            <>
                <Link to={'/'}>Home</Link>
                <Search onChange={this.onChange} results={this.state.results} addToSeedList={this.addToSeedList} />
                <Tracklist recommendations={this.state.recommendations} />
            </>
        )
    }
}
