// eslint-disable-next-line no-unused-vars
import { Component, createElement, useEffect, useState } from "react";
import { Tag } from "./Tag";
import { v4 as uuidv4 } from "uuid";
// eslint-disable-next-line sort-imports, no-unused-vars
import * as mx from "mendix";

export function WorkflowContainer(props) {
    const { onClickMoreAction } = props;
    const { onTagAddAction } = props;
    const [mounted, setMounted] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [tagsArray, setTagsArray] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [masterTagsList, setMasterTagsList] = useState(props.masterTagsList.value ?? "");
    const [tagComponents, setTagComponents] = useState([]);
    const [limit] = useState(props.limit ?? 5);
    const [delimiter] = useState(props.delimiter ?? " ");
    const [tagCount, setTagCount] = useState(0);
    const [tagCountDisplay, setTagCountDisplay] = useState("");

    // listen for changes to the masterTagsList attribute and update tags
    useEffect(() => {
        if (mounted) {
            console.debug("Updating tags with masterTagsList:", props.masterTagsList.value);
            updateAllTags(props.masterTagsList.value);
        }
        return () => {
            console.debug("Cleaning up tags update effect");
        };
        // adding 'mounted' dependency to fix initial rendering bug that occurred when moving wdiget outside of sandbox.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.masterTagsList, mounted]);

    // set mounted when render() is first called
    useEffect(() => {
        console.debug("WorkflowContainer mounted");
        setMounted(true);
        return () => {};
    }, []);

    // update state with new tag and call onChangeAction if set
    const saveTag = (index, oldValue, newValue) => {
        console.debug("calling saveTag");
        const fullTagsArray = props.masterTagsList.value.split(delimiter).filter(i => i);
        fullTagsArray.splice(index, 1, newValue);
        const updatedMasterTagsList = fullTagsArray.join(delimiter);
        console.debug("Data is changing in WorkflowContainer - saveTag:", oldValue, "=>", newValue);
        props.masterTagsList.setValue(updatedMasterTagsList);
        if (props.onChangeAction) {
            props.onChangeAction.execute();
        }
        return true;
    };

    // remove tag from list and update state
    const deleteTag = (index, value) => {
        console.debug("calling deleteTag", tagsArray);
        const fullTagsArray = props.masterTagsList.value.split(delimiter).filter(i => i);
        console.debug("fullTagsArray before", fullTagsArray);
        fullTagsArray.splice(index, 1);
        console.debug("fullTagsArray after", fullTagsArray);
        const updatedMasterTagsList = fullTagsArray.join(delimiter);
        props.masterTagsList.setValue(updatedMasterTagsList);
        if (props.onChangeAction) {
            props.onChangeAction.execute();
        }
        updateAllTags(updatedMasterTagsList);
    };

    // update state with new masterTagsList and rebuild tag components
    const updateAllTags = value => {
        console.debug("calling updateAllTags");
        if (value !== undefined) {
            const tagCount = value.split(delimiter).filter(i => i).length;
            var tagCountDisplay = tagCount - limit;
            if (tagCount > 99) {
                tagCountDisplay = "99+";
            }
            const tagsArraySliced = value
                .split(delimiter)
                .filter(i => i)
                .slice(0, limit);
            const newTagComponents = tagsArraySliced.map((tag, index) => (
                <Tag
                    key={uuidv4()}
                    tag={tag}
                    index={index}
                    saveTag={saveTag.bind(this)}
                    deleteTag={deleteTag.bind(this)}
                />
            ));
            console.debug("Data is changing in WorkflowContainer - updateAllTags:", "New value:", value);
            setMasterTagsList(value);
            console.debug("setMasterTagsList", value);
            setTagsArray(tagsArraySliced);
            console.debug("setTagsArray", tagsArraySliced);
            setTagComponents(newTagComponents);
            console.debug("setTagComponents", newTagComponents);
            setTagCount(tagCount);
            setTagCountDisplay(tagCountDisplay);
        }
    };

    // add a new tag to the front of the tags list
    const addTag = () => {
        console.debug("calling addTag");
        onTagAddAction.execute(); //this was broken so I refactored it out to a mf
    };

    return (
        <div className="ev-workflow-container">
            <button className="ev-workflow-admin-button ev-workflow-admin-button-add" onClick={addTag.bind(this)}>
                Workflow: Add<i className="mdi mdi-plus"></i>
            </button>
            {tagComponents.map(tag => {
                return tag;
            })}
            {tagCount - limit > 0 ? (
                <button
                    className="ev-workflow-admin-button ev-workflow-admin-button-view-all"
                    onClick={() => onClickMoreAction.execute()}
                >
                    <i className="mdi mdi-open-in-new"></i>
                    {tagCountDisplay} more
                </button>
            ) : null}
        </div>
    );
}
