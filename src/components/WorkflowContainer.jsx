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
        console.warn('useEffect 1', props);
        setMounted(true);
        return () => {};
    }, []);

    useEffect(() => {
        if (mounted) {
            console.warn('useEffect 2', props);
            updateAllTags(props.masterTagsList.value);
            props.masterTagsList
        }
        return () => {};
    }, [props.masterTagsList])

    const updateAllTags = (value) => {
        console.warn('updateAllTags', value);
        console.error('updateAllTags masterTagsList', masterTagsList);
        console.error('updateAllTags props.masterTagsList.value', props.masterTagsList.value);
        if (value != undefined) {
            const tagCount = value.split(delimiter).filter(i => i).length;
            console.warn('updateAllTags tagCount', tagCount);
            var tagCountDisplay = tagCount - limit;
            if (tagCount > 99) {
                tagCountDisplay = '99+'; 
            }
            console.warn('updateAllTags tagCountDisplay', tagCountDisplay);
            const tagsArraySliced = value.split(delimiter).filter(i => i).slice(0, limit);
            console.warn('updateAllTags tagsArraySliced', tagsArraySliced);
            const newTagComponents = tagsArraySliced.map((tag, index) => {
                return <Tag tag={tag} index={index} saveTag={saveTag.bind(this)} deleteTag={deleteTag.bind(this)}/>
            });
            // console.error('newTagComponenets', newTagComponents)
            setMasterTagsList(value);
            setTagsArray(tagsArraySliced);
            setTagComponents(newTagComponents);
            setTagCount(tagCount);
            setTagCountDisplay(tagCountDisplay);
        }
    }

    const addTag = () => {
        console.debug('addTag');
        tagsArray.splice(0, 0, 'New Value');
        const newTagsText = 'New Tag' + delimiter + masterTagsList;
        setMasterTagsList(newTagsText);
        setTagsArray(tagsArray);
        updateAllTags(newTagsText);
        // this.setState({
        //     masterTagsList: newTagsText,
        //     tagsArrayHasBeenSet: false,
        //     tagsArray: newTagsArray
        // });
        // this.setTagsArray(newTagsText);
    }

    const saveTag = (index, oldValue, newValue) => {
        console.debug('saveTag', index, oldValue, newValue);
        console.debug('saveTag props.masterTagsList.value', props.masterTagsList.value);
        const fullTagsArray = props.masterTagsList.value.split(delimiter).filter(i => i);
        console.debug('saveTag fullTagsArray', fullTagsArray);
        // check if tag already exists
        const lowerCaseTags = fullTagsArray.map(tag => tag.toLowerCase());
        const duplicateIndex = lowerCaseTags.indexOf(newValue.toLowerCase());
        if (duplicateIndex != -1 && duplicateIndex != index) {
            console.error("DUPLICATE!");
            return false;
        }
        const oldTagValue = fullTagsArray[index];
        if (oldTagValue != oldValue) {
            console.debug('MISTMATCH', oldTagValue, oldValue);
            return false;
        } else {
            console.debug('NO MISTMATCH', index, oldValue);
            fullTagsArray.splice(index, 1, newValue);
            console.debug('saveTag fullTagsArray', fullTagsArray);
            const updatedMasterTagsList = fullTagsArray.join(delimiter);
            // updateAllTags(updatedMasterTagsList);
            console.error('props.onChangeAction', props.onChangeAction);
            console.error('SETTING VALUE ON MASTERTAGSLIST', props);
            props.masterTagsList.setValue(updatedMasterTagsList);
            if (props.onChangeAction) {
                props.onChangeAction.execute();
            }
            return true;
            // props.onChangeAction(updatedMasterTagsList);
        }
    }

    const deleteTag = (index, value) => {
        saveTag(index, value, '');
        // const fullTagsArray = props.masterTagsList.value.split(delimiter).filter(i => i);
        // fullTagsArray.splice(index, 1);
        // const updatedMasterTagsList = fullTagsArray.join(delimiter);
        // updateAllTags(updatedMasterTagsList);
        // if (props.onChangeAction) {
        //     props.onChangeAction.execute();
        // }
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
