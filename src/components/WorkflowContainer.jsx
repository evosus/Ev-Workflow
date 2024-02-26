import { Component, createElement, useEffect, useState } from "react";
import { Tag } from "./Tag";
import  * as mx  from "mendix";

// export class WorkflowContainer extends Component {
export function WorkflowContainer(props) {

    const [mounted, setMounted] = useState(false);
    const [tagsArray, setTagsArray] = useState([]);
    const [masterTagsList, setMasterTagsList] = useState(props.masterTagsList.value ?? '');
    const [tagComponents, setTagComponents] = useState([]);
    const [limit, setLimit] = useState(props.limit ?? 5);
    const [delimiter, setDelimiter] = useState(props.delimiter ?? ' ');
    const [tagCount, setTagCount] = useState(0);
    const [tagCountDisplay, setTagCountDisplay] = useState('');
    

    useEffect(() => {
        console.info('useEffect 1', props);
        setMounted(true);
        return () => {};
    }, []);

    useEffect(() => {
        if (mounted) {
            console.info('useEffect 2', props);
            updateAllTags(props.masterTagsList.value);
            props.masterTagsList
        }
        return () => {};
    }, [props.masterTagsList])

    const updateAllTags = (value) => {
        console.info('updateAllTags', value);
        console.info('updateAllTags masterTagsList', masterTagsList);
        console.info('updateAllTags props.masterTagsList.value', props.masterTagsList.value);
        if (value != undefined) {
            const tagCount = value.split(delimiter).filter(i => i).length;
            console.info('updateAllTags tagCount', tagCount);
            var tagCountDisplay = tagCount - limit;
            if (tagCount > 99) {
                tagCountDisplay = '99+'; 
            }
            console.info('updateAllTags tagCountDisplay', tagCountDisplay);
            const tagsArraySliced = value.split(delimiter).filter(i => i).slice(0, limit);
            console.info('updateAllTags tagsArraySliced', tagsArraySliced);
            const newTagComponents = tagsArraySliced.map((tag, index) => {
                return <Tag tag={tag} index={index} saveTag={saveTag.bind(this)} deleteTag={deleteTag.bind(this)}/>
            });
            setMasterTagsList(value);
            setTagsArray(tagsArraySliced);
            setTagComponents(newTagComponents);
            setTagCount(tagCount);
            setTagCountDisplay(tagCountDisplay);
        }
    }

    const addTag = () => {
        console.info('addTag');
        tagsArray.splice(0, 0, 'New Value');
        const newTagsText = 'new' + delimiter + masterTagsList;
        setMasterTagsList(newTagsText);
        setTagsArray(tagsArray);
        updateAllTags(newTagsText);
        props.onAddAction.execute(); //added och call
    }

    const saveTag = (index, oldValue, newValue) => {
        console.info('saveTag', index, oldValue, newValue);
        console.info('saveTag props.masterTagsList.value', props.masterTagsList.value);
        const fullTagsArray = props.masterTagsList.value.split(delimiter).filter(i => i);
        console.info('saveTag fullTagsArray', fullTagsArray);
        // check if tag already exists
        const lowerCaseTags = fullTagsArray.map(tag => tag.toLowerCase());
        const duplicateIndex = lowerCaseTags.indexOf(newValue.toLowerCase());
        if (duplicateIndex != -1 && duplicateIndex != index) {
            console.info("DUPLICATE!");
            return false;
        }
        const oldTagValue = fullTagsArray[index];
            console.info('NO MISTMATCH', index, oldValue);
            fullTagsArray.splice(index, 1, newValue);
            console.info('saveTag fullTagsArray', fullTagsArray);
            const updatedMasterTagsList = fullTagsArray.join(delimiter);
            console.info('props.onChangeAction', props.onChangeAction);
            console.info('SETTING VALUE ON MASTERTAGSLIST', props);
            props.masterTagsList.setValue(updatedMasterTagsList);
            if (props.onChangeAction) {
                props.onChangeAction.execute();
            }
            return true;
    }

    const deleteTag = (index, value) => {
        saveTag(index, value, '');
        console.error('deleting element at index:', index);
    }
    
    return (
        <div className="ev-workflow-container">
            <button className="ev-workflow-admin-button ev-workflow-admin-button-add" onClick={addTag.bind(this)}><i className="mdi mdi-plus"></i>Add</button>
            {tagComponents.map((tag) => {
                return tag;
            })}
            {tagCount - limit > 0 ?
                <button className="ev-workflow-admin-button ev-workflow-admin-button-view-all">
                    <i className="mdi mdi-open-in-new"></i>{tagCountDisplay} more
                </button>: null
            }
        </div>
    )
}
