import React, { Component } from 'react'
import './Search.css'
import { MdClear } from "react-icons/md";

export default class search extends Component {

    state = {
        selectedSongs: []
    }

    saveSelectedSongs = (songPicked) => {
        this.setState({
            selectedSongs: [...this.state.selectedSongs, songPicked]
        })
    }

    unsaveSelectedSongs = (songPicked) => {
        let filteredArray = this.state.selectedSongs.filter(song => song !== songPicked)
        this.setState({ selectedSongs: filteredArray });
    }

    renderSelectedSongs = () => {
        const { removeFromSeedList } = this.props;
        return (
            <div className="chosen-items-container">
                {this.state.selectedSongs.map((result) => {
                    return (
                        <div key={result.id} className="chosen-items">

                            <img className="album-image" src={result.album.images[0].url} alt={result.name} />
                            <div>{result.name}</div>
                            <MdClear onClick={() => { removeFromSeedList(result.id); this.unsaveSelectedSongs(result) }} />

                        </div>
                    );
                })}
            </div>
        )
    }

    renderSearchResults = () => {
        const { results, addToSeedList } = this.props;

        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                            <div key={result.id} onClick={() => { addToSeedList(result.id); this.saveSelectedSongs(result) }} className="result-items">
                                <img className="image" src={result.album.images[0].url} alt={result.name} />
                                {result.name}
                            </div>
                        );
                    })}
                </div>
            );
        }
    };


    render() {
        return (
            <>
                <div className="container">
                    <h3>Search for songs to find your new favorite tunes.</h3>
                    <label className="search-label" htmlFor="search-input">
                        <input
                            type="text"
                            id="search-input"
                            onChange={this.props.onChange}
                        />
                        <i className="fa fa-search search-icon" />
                    </label>

                    {/* render search result list */}
                    {this.renderSearchResults()}
                </div>

                {/* render user's selections */}
                {this.renderSelectedSongs()}
            </>
        )
    }
}
