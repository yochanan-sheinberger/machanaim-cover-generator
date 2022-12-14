import { useEffect, useState } from "react";
import ReactGA from "react-ga4";

const useGaTracker = () => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        if (!window.location.href.includes("localhost")) {
            ReactGA.initialize("G-D9M96R3411");
        }
        setInitialized(true);
    }, []);

    useEffect(() => {
        if (initialized) {
            ReactGA.send({ hitType: "pageview", page: 'cover-generator' });
        }
    }, [initialized]);
};

export default useGaTracker;