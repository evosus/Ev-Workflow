import { Component, createElement, useEffect, useState } from "react";
import { Tag } from "./Tag";

// export class WorkflowContainer extends Component {
export function WorkflowContainer(props) {

    const [mounted, setMounted] = useState(false);
    const [tagsArray, setTagsArray] = useState([]);
    const [masterTagsList, setMasterTagsList] = useState(props.masterTagsList);
    const [tagComponents, setTagComponents] = useState([]);
    const [limit, setLimit] = useState(props.limit ?? 5);
    const [delimiter, setDelimiter] = useState(props.delimiter ?? ' ');
    

    useEffect(() => {
        setMounted(true);
        return () => {};
    }, []);

    useEffect(() => {
        console.warn('useEffect', props);
        if (mounted) {
            updateTagsArray(props.masterTagsList.value);
        }
        return () => {};
    }, [props.masterTagsList])

    const updateTagsArray = (value) => {
        console.warn('updateTagsArray', value);

        console.error('this.state.masterTagsList', masterTagsList);
        console.error('this.props.masterTagsList', props.masterTagsList.value);
        if (value != undefined) {
            console.info('this.state.masterTagsList', masterTagsList.value);
            const tagsArraySliced = value.split(delimiter).slice(0, limit);
            const newTagComponents = tagsArraySliced.map((tag) => {
                return <Tag tag={tag} />
            });
            console.error('newTagComponenets', newTagComponents)
            setMasterTagsList(value);
            setTagsArray(tagsArraySliced);
            setTagComponents(newTagComponents);
        }
    }

    const addTag = () => {
        // console.debug('addTag');
        // const newTagsArray = tagsArray.splice(0, 0, 'New Value');
        // const newTagsText = 'New Tag' + this.delimiter + masterTagsList;
        // setMasterTagsList(newTagsText);
        // setTagsArray(newTagsArray);
        // updateTagsArray()
        // this.setState({
        //     masterTagsList: newTagsText,
        //     tagsArrayHasBeenSet: false,
        //     tagsArray: newTagsArray
        // });
        // this.setTagsArray(newTagsText);
    }
    
    return (
        <div className="ev-workflow-container">
            <button className="ev-workflow-admin-button ev-workflow-admin-button-add" onClick={addTag.bind(this)}><i className="mdi mdi-plus"></i>Add</button>
            {tagComponents.map((tag) => {
                return tag;
            })}
            {tagsArray.length - limit > 0 ?
                <button className="ev-workflow-admin-button ev-workflow-admin-button-view-all">
                    <i className="mdi mdi-open-in-new"></i>{(tagsArray.length - limit)} more
                </button>: null
            }
        </div>
    )
}
