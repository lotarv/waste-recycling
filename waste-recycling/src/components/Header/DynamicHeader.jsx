import { useLocation } from "react-router-dom";
import HeaderProducers from "./HeaderProducers";
import HeaderTechnologies from "./HeaderTechnologies";
import Header from "./Header";
function DynamicHeader(){
    const location = useLocation();

    if (location.pathname.startsWith("/technology")) {
        return <HeaderTechnologies></HeaderTechnologies>
    }

    if (location.pathname.startsWith("/wasteProducers")) {
        return <HeaderProducers></HeaderProducers>
    }

    return <Header/>;
}

export default DynamicHeader;