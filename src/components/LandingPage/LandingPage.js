import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default class LandingPage extends Component {

    componentDidMount = () => {
        const string = "The ultimate mixtape generator";
        const str = string.split("");
        const el = document.getElementById('str');
        (function animate() {
            const running = setTimeout(animate, 90);
            str.length > 0 ? el.innerHTML += str.shift() : clearTimeout(running);
        })();

    }
    render() {
        return (
            <div className="home-body">
                <h1 id="str"></h1>
                <h2>Discover new music and create curated playlists.<br />
                    <Link to={'/generator'}>
                        <div className="box-2">
                            <div className="btn btn">
                                <span>START</span>
                            </div>
                        </div>
                    </Link>
                </h2>
            </div>
        )
    }
}


