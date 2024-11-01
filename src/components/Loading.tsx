import SoundMuve from "@/assets/images/soundMuve.png";

export default function LoadingComponent() {

    return (
        <main 
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                // overflow: "hidden",
                background: "#000"
            }}
        >

            <div className="breathing-image">
                <img src={SoundMuve} alt="soundmuve icon" style={{width: 130, objectFit: "contain"}} />
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