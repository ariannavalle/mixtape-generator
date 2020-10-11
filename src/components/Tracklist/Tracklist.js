import React, { Component } from 'react'
import './Tracklist.css'

export default class Tracklist extends Component {
    render() {
        const { recommendations } = this.props
        return (
            <div>
                <div className="tracklist-container">
                    {recommendations.map((rec, id) => {
                        return <div key={rec.id}>{id + 1}.{rec.name} - {rec.artists[0].name}
                            <audio controls src={rec.preview_url}>Your browser does not support the <code>audio</code> element.</audio>
                        </div>
                    })
                    }
                </div>
            </div>
        )
    }
}
