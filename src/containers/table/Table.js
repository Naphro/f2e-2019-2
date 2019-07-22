import React from "react"
// import classes from "./Table.css"
import './Table.css'


export default class Table extends React.Component {
    data = [1, 2, 3, 4, 5, 6, 7, 8];

    render() {
        return (
            <div className="playground">
                <nav className="sidenav"></nav>
                <header className="header"></header>
                <main className="main">
                    {
                        this.data.map(item => (<div className="place" key={item}></div>))
                    }
                </main>
            </div>
        )
    }
}