import Skeleton from "../components/skeleton/Skeleton";
import Error from "../components/error/Error";
import Spinner from "../components/spinner/Spinner";

const setContent = (process, Component, data) => {
    switch (process) {
        case 'waiting':
            return <Skeleton/>;
        case 'loading':
            return <Spinner/>;
        case 'confirmed':
            return <Component data={data}/>;
        case 'error':
            return <Error/>;
        default:
            throw new Error('Unexpected process state');
    }
}

export default setContent;