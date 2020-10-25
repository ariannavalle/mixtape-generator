import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import Search from '../Search/Search'
import Tracklist from '../Tracklist/Tracklist'
import './SearchTrackListContainer.css'
import Mixtape from '../Mixtape/Mixtape';
import MusicPlayer from '../MusicPlayer/MusicPlayer'

export default class SearchTrackListContainer extends Component {
    state = {
        query: '',
        results: {},
        trackIDs: [],
        recommendations: [],
        mixtapeTracks: [],
        displayRecordBtn: true,
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
                recommendations: recs.data.tracks.filter(t => t.preview_url),
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

        document.querySelector('#search-input').value = ""
        this.getrecommendations()
    }

    removeFromSeedList = async (id) => {
        let filteredArray = this.state.trackIDs.filter(trackID => trackID !== id)
        this.setState({ trackIDs: filteredArray });

        this.getrecommendations()
    }

    addTrackToMixtape = async (track) => {
        await this.setState({
            mixtapeTracks: [...this.state.mixtapeTracks, track],
        })
    }

    removeTrackFromMixtape = async (track) => {
        let filteredArray = this.state.mixtapeTracks.filter(mixtapeTrack => mixtapeTrack !== track)
        await this.setState({ mixtapeTracks: filteredArray });
    }

    toggleBtnState = () => {
        this.setState({
            displayRecordBtn: !this.state.displayRecordBtn
        })
    }

    render() {
        return (
            <div className="search-tracklist-body">
                <div><Link to={'/'} className="home-link"><i style={{ color: "white" }} className='fa fa-home'></i></Link><br /></div>
                <div className="align-center">
                    <div className="search-tracklist-container">

                        <Search onChange={this.onChange} results={this.state.results} addToSeedList={this.addToSeedList} removeFromSeedList={this.removeFromSeedList} />
                        <div className="tracklist-columns">
                            <Tracklist recommendations={this.state.recommendations} addTrackToMixtape={this.addTrackToMixtape} />
                            {this.state.recommendations.length >= 1 && (this.state.displayRecordBtn ?
                                <Mixtape tracks={this.state.mixtapeTracks} removeTrackFromMixtape={this.removeTrackFromMixtape} toggleBtnState={this.toggleBtnState} /> :
                                <MusicPlayer tracks={this.state.mixtapeTracks} toggleBtnState={this.toggleBtnState} />)}
                        </div>
                    </div>
                </div>
                <div className="contact-icons" >
                    <a href="https://www.linkedin.com/in/ariannavalle/" id="linkedin-icon">
                        <img src="./images/linkedin-icon.png" alt="Arianna's LinkedIn" width="30px" height="30px" />
                    </a>
                    <a href="https://github.com/ariannavalle" id="github-icon">
                        <img src="./images/github-icon.png" alt="Arianna's Github" width="30x" height="30px" />
                    </a>
                </div>
            </div>
        )
    }
}
