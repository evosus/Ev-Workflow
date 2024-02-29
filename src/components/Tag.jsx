// eslint-disable-next-line no-unused-vars
import { Component, createElement, createRef, useEffect, useRef, useState } from "react";

// export class Tag extends Component {
export function Tag(props) {
    const input = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [tagText, setTagText] = useState(props.tag);
    const [originalTagText, setOriginalTagText] = useState(props.tag);
    const [deleted, setDeleted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => {};
    }, []);

    const setSpanValue = value => {
        input.current.innerHTML = value;
    };

    useEffect(() => {
        if (mounted && input.current != null) {
            setSpanValue(tagText);
        }
    }, [mounted, tagText, confirmDelete]);

    useEffect(() => {
        // console.error('useEffect', props.tag);
        // console.error('deleted', deleted);
        if (deleted) {
            setDeleted(false);
            setConfirmDelete(false);
        }
        setTagText(props.tag);
        setOriginalTagText(props.tag);
    }, [props.tag]);

    const toggleEdit = () => {
        setEditMode(!editMode);
    };

    const cancelEdit = () => {
        setTagText(originalTagText);
        setSpanValue(originalTagText);
        setEditMode(false); //now canceling out of edit mode
    };

    const saveTag = () => {
        var newTagText = input.current.innerHTML;
        props.saveTag(props.index, originalTagText, newTagText);
        setTagText(newTagText);
        setOriginalTagText(newTagText);
        setSpanValue(tagText);
        toggleEdit();
    };

    const toggleConfirmDelete = () => {
        setConfirmDelete(!confirmDelete);
    };

    const deleteTag = () => {
        props.deleteTag(props.index, tagText); //now passing index and tag text arguments
        setDeleted(true);
    };

    return deleted ? "" : confirmDelete ? buildConfirmDeleteTag() : buildTag();

    function buildTag() {
        return (
            <div className="ev-workflow-tag-container">
                <button
                    className={"ev-workflow-button ev-workflow-icon ev-workflow-edit"}
                    onClick={editMode ? saveTag.bind(this) : toggleEdit.bind(this)}
                >
                    <i className={"mdi" + confirmDelete ? (editMode ? " mdi-check" : " mdi-edit") : ""}></i>
                </button>
                <span
                    ref={input}
                    tabIndex="0"
                    className={"input ev-workflow-input" + (editMode ? " edit-mode" : "")}
                    role="textbox"
                    contentEditable={editMode ? "true" : "false"}
                ></span>
                <button
                    className={"ev-workflow-button ev-workflow-icon ev-workflow-delete"}
                    onClick={editMode ? cancelEdit : toggleConfirmDelete}
                >
                    <i className={editMode ? "mdi mdi-close" : "mdi mdi-delete"}></i>
                </button>
            </div>
        );
    }

    function buildConfirmDeleteTag() {
        return (
            <div className="ev-workflow-tag-container">
                <button
                    className={"confirm-delete-button confirm-delete-button-left cancel-delete-button"}
                    onClick={toggleConfirmDelete}
                >
                    Cancel
                </button>
                <span className="confirm-delete-text">Are you sure?</span>
                <button
                    className={"confirm-delete-button confirm-delete-button-right ev-workflow-delete"}
                    onClick={deleteTag}
                >
                    Delete
                </button>
            </div>
        );
    }
}
