import React from 'react'
import { Link } from 'react-router-dom';
import './LandingPage.css'

export default function LandingPage() {
    return (
        <div>
            <h1>The ultimate mixtape generator</h1>
            <h2>Discover new music and create curated playlists.</h2>
            <Link to={'/generator'}>Go</Link>
        </div>
    )
}
