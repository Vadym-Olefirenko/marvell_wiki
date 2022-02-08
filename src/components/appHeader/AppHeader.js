import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href={'a'}>
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href={'a'}>Characters</a></li>
                    /
                    <li><a href={'a'}>Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;