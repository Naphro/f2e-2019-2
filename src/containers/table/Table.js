import React from "react"
// import classes from "./Table.css"
import './Table.css'
import StorageFinish from '../../components/storageFinish/StorageFinish'



export default class Table extends React.Component {
    data = [1, 2, 3, 4];

    render() {
        return (
            <div className="playground">
                <nav className="sidenav"></nav>
                <header className="header"></header>
                <main className="main">
                    <div className="storages">
                        {
                            this.data.map(item => (<StorageFinish></StorageFinish>))
                        }
                    </div>
                </main>
            </div>
        )
    }
}
