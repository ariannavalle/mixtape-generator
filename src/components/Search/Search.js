import React, { Component } from 'react'
import './Search.css'

export default class search extends Component {

    renderSearchResults = () => {
        const { results, addToSeedList } = this.props;

        if (Object.keys(results).length && results.length) {
            return (
                <div className="results-container">
                    {results.map((result) => {
                        return (
                            <div key={result.id} onClick={() => { addToSeedList(result.id) }} className="result-items">
                                <div className="columns">
                                    <div className="column is-1">
                                        <img className="image" src={result.album.images[0].url} alt={result.name} />
                                    </div>
                                    <div className="column">
                                        {result.name}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        }
    };


    render() {
        return (
            // render search box
            <div className="container">
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
        )
    }
}
