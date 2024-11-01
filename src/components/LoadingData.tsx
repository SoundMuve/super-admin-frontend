import SoundMuve from "@/assets/images/icon.png";
// import SoundMuve from "@/assets/images/logo.png";


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

            <div className="breathing-image">
                <img src={SoundMuve} alt="soundmuve icon" style={{ width: "100%", maxWidth: 100, objectFit: "contain"}} />
                <style>
                    {`
                        .breathing-image {
                            animation: breathe ${2}s ease-in-out infinite;
                        }

                        @keyframes breathe {
                            0% {
                                transform: scale(1);
                            }
                            50% {
                                transform: scale(${0.7});
                            }
                            100% {
                                transform: scale(1);
                            }
                        }
                    `}
                </style>
            </div>
        </main>
    );
}

export default LoadingDataComponent;