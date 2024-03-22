// eslint-disable-next-line no-unused-vars
import { Component, createElement, useEffect, useRef, useState } from "react";

// export class Tag extends Component {
export function Tag(props) {
    const input = useRef(null);
    const [mounted, setMounted] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [tagText, setTagText] = useState(props.tag);
    const [originalTagText, setOriginalTagText] = useState(props.tag);
    const [deleted, setDeleted] = useState(false);
    const handleKeyDown = event => {
        const keyCode = event.keyCode || event.which;
        if (keyCode === 13) {
            event.preventDefault();
        }
    };

    // set mounted when render() is first called
    useEffect(() => {
        setMounted(true);
        return () => {};
    }, []);

    // set span innerHTML to current tagText to mimick <input> behavior
    useEffect(() => {
        if (mounted && input.current != null) {
            // eslint-disable-next-line no-use-before-define
            setSpanValue(tagText);
        }
    }, [mounted, tagText, confirmDelete]);

    // listen for tag changes
    useEffect(() => {
        // if this tag was previously deleted it needs to reset
        // to be re-used with new tagText
        if (deleted) {
            setDeleted(false);
            setConfirmDelete(false);
        }
        setTagText(props.tag);
        setOriginalTagText(props.tag);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.tag]);

    // set span innerHTML
    const setSpanValue = value => {
        input.current.innerHTML = value;
    };

    // toggle whether the tag is being edited or not
    const toggleEdit = () => {
        setEditMode(!editMode);
    };

    // return tag to non-editing state and restore last savged tagText
    const cancelEdit = () => {
        setTagText(originalTagText);
        setSpanValue(originalTagText);
        setEditMode(false); //now canceling out of edit mode
    };

    // read value from span element and save changes to state
    // return to non-editing mode
    const saveTag = () => {
        const newTagText = input.current.innerHTML;
        props.saveTag(props.index, originalTagText, newTagText);
        setTagText(newTagText);
        setOriginalTagText(newTagText);
        setSpanValue(tagText);
        toggleEdit();
    };

    // toggle whether the confirm delete message should show or not
    const toggleConfirmDelete = () => {
        setConfirmDelete(!confirmDelete);
    };

    // delete this tag from the master list
    const deleteTag = () => {
        props.deleteTag(props.index, tagText); //now passing index and tag text arguments
        setDeleted(true);
    };

    // if tag is deleted, show nothing
    // if confirmDelete then show confrim delete prompt
    // else show the normal tag component
    return deleted ? "" : confirmDelete ? buildConfirmDeleteTag() : buildTag();

    // build the normal tag component to view or edit
    function buildTag() {
        return (
            <div className="ev-workflow-tag-padding">
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
                        onKeyDown={handleKeyDown}
                    ></span>
                    <button
                        className={"ev-workflow-button ev-workflow-icon ev-workflow-delete"}
                        onClick={editMode ? cancelEdit : toggleConfirmDelete}
                    >
                        <i className={editMode ? "mdi mdi-close" : "mdi mdi-delete"}></i>
                    </button>
                </div>
            </div>
        );
    }

    // build tag with confirm delete prompt
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
