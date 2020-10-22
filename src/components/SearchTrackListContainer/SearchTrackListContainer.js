import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Search from '../Search/Search'
import Tracklist from '../Tracklist/Tracklist'
import './SearchTrackListContainer.css'
import Mixtape from '../Mixtape/Mixtape';

export default class SearchTrackListContainer extends Component {
    state = {
        query: '',
        results: {},
        trackIDs: [],
        recommendations: [],
        mixtapeTracks: []
    }

    componentDidMount = async () => {

        const headers = {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            auth: {
                username: process.env.REACT_APP_USERNAME,
                password: process.env.REACT_APP_PASSWORD,
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

    addTrackToMixtape = async (track) => {
        await this.setState({
            mixtapeTracks: [...this.state.mixtapeTracks, track],
        })
    }

    render() {
        return (
            <div className="search-tracklist-body">
                <div><Link to={'/'} className="home-link"><i style={{ color: "white" }} className='fa fa-home'></i></Link><br /></div>
                <div className="align-center">
                    <div className="search-tracklist-container">

                        <Search onChange={this.onChange} results={this.state.results} addToSeedList={this.addToSeedList} />
                        <div className="tracklist-columns">
                            <Tracklist recommendations={this.state.recommendations} addTrackToMixtape={this.addTrackToMixtape} />
                            {this.state.recommendations.length >= 1 && <Mixtape tracks={this.state.mixtapeTracks} />}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
