import React from "react";
import {useHistory, useParams} from "react-router-dom";
import QualitiesForm from "../components/ui/qualitiesForm";
import {useQualities} from "../hooks/useQualities";

const EditQualityPage = () => {
    const id = useParams().id;
    const history = useHistory();
    const { getQuality, updateQuality } = useQualities()
    const quality = getQuality(id);
    const HandleSubmit = (data) => {
        updateQuality(id, data).then((data) => {if (data) history.push("/")});
    }
    return (
        <>
            <h1>Edit Quality Page</h1>
            <QualitiesForm data={quality} onSubmit={HandleSubmit}/>
        </>
    );
};

export default EditQualityPage;
