import ErrorImg from './error.gif';

const styles = {
    width: '250px',
    height: '250px',
    display: 'block',
    margin: '0 auto'
}

const Error = () => {
    return <img style={styles} src={ErrorImg} alt="error"/>
}

export default Error;