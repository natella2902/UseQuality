import React from "react";
import QualitiesForm from "../components/ui/qualitiesForm";
import {useQualities} from "../hooks/useQualities";
import {useHistory} from "react-router-dom";

const AddQualityPage = () => {
    const history = useHistory();
    console.log(history)
    const { addQuality } = useQualities()
    const HandleSubmit = (data) => {
        addQuality(data).then((data) => {if(data) history.push("/")});
    }
    return (
        <>
            <h1>Add Quality</h1>
            <QualitiesForm onSubmit={HandleSubmit}/>
        </>
    );
};

export default AddQualityPage;
