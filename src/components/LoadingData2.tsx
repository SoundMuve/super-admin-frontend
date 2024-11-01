import loadingStyles from './loadingStyles.module.css';


interface _Props {
    containerHeight?: string,
}

const LoadingDataComponent: React.FC<_Props> = ({ containerHeight = "30vh" }) => {

    return (
        <main 
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: containerHeight,
            }}
        >
            <div className={loadingStyles.loader}></div>
        </main>
    );
}

export default LoadingDataComponent;