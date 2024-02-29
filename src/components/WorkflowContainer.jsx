// eslint-disable-next-line no-unused-vars
import { Component, createElement, useEffect, useState } from "react";
import { Tag } from "./Tag";
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

    useEffect(() => {
        setMounted(true);
        return () => {};
    }, []);

    const saveTag = (index, oldValue, newValue) => {
        console.warn("calling saveTag");
        const fullTagsArray = props.masterTagsList.value.split(delimiter).filter(i => i);
        fullTagsArray.splice(index, 1, newValue);
        const updatedMasterTagsList = fullTagsArray.join(delimiter);
        console.warn("Data is changing in WorkflowContainer - saveTag:", oldValue, "=>", newValue);
        props.masterTagsList.setValue(updatedMasterTagsList);
        if (props.onChangeAction) {
            props.onChangeAction.execute();
        }
        return true;
    };

    const deleteTag = (index, value) => {
        console.warn("calling deleteTag", tagsArray);
        const fullTagsArray = props.masterTagsList.value.split(delimiter).filter(i => i);
        console.warn("fullTagsArray before", fullTagsArray);
        fullTagsArray.splice(index, 1);
        console.warn("fullTagsArray after", fullTagsArray);
        const updatedMasterTagsList = fullTagsArray.join(delimiter);
        props.masterTagsList.setValue(updatedMasterTagsList);
        if (props.onChangeAction) {
            props.onChangeAction.execute();
        }
        updateAllTags(updatedMasterTagsList);
    };

    const updateAllTags = value => {
        console.warn("calling updateAllTags");
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
                    key={index}
                    tag={tag}
                    index={index}
                    saveTag={saveTag.bind(this)}
                    deleteTag={deleteTag.bind(this)}
                />
            ));
            console.warn("Data is changing in WorkflowContainer - updateAllTags:", "New value:", value);
            setMasterTagsList(value);
            console.warn("setMasterTagsList", value);
            setTagsArray(tagsArraySliced);
            console.warn("setTagsArray", tagsArraySliced);
            setTagComponents(newTagComponents);
            console.warn("setTagComponents", newTagComponents);
            setTagCount(tagCount);
            setTagCountDisplay(tagCountDisplay);
        }
    };

    useEffect(() => {
        if (mounted) {
            updateAllTags(props.masterTagsList.value);
        }
        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.masterTagsList]);

    const addTag = () => {
        console.warn("calling addTag");
        onTagAddAction.execute(); //this was broken so I refactored it out to a mf
    };

    return (
        <div className="ev-workflow-container">
            <button className="ev-workflow-admin-button ev-workflow-admin-button-add" onClick={addTag.bind(this)}>
                <i className="mdi mdi-plus"></i>Add
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
