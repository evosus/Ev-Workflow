import { Component, createRef, createElement, useState, useEffect, useRef } from "react";

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

    useEffect(() => {
        console.error('useEffect', input);
        if (mounted && input.current!= null) {
            setSpanValue(tagText);
        }
    }, [mounted, tagText, confirmDelete]);

    useEffect(() => {
        setTagText(props.tag);
        setOriginalTagText(props.tag);
    }, [props.tag]);

    const toggleEdit = () => {
        console.debug("toggleEdit")
        try {
            console.info(tagText);
        } catch (e) {
            console.error(e);
        }
        setEditMode(!editMode);
    }

    const cancelEdit = () => {
        console.debug("cancelEdit");
        console.debug("current text: " + tagText);
        setTagText(originalTagText);
        setSpanValue(originalTagText);
        console.debug("set tagText back to: " + tagText);
    }

    const saveTag = () => {
        console.warn("saveTag", input);
        var newTagText = input.current.innerHTML;
        const result = props.saveTag(props.index, originalTagText, newTagText);
        if (!result) {
            alert('DUPLICATE TAG NOT ALLOWED');
            console.error('DUPLICATE TAG NOT ALLOWED');
            cancelEdit();
        } else {
            console.info("newTagText", newTagText);
            setTagText(newTagText);
            setOriginalTagText(newTagText);
            setSpanValue(tagText);
            toggleEdit();
        }
        //TODO: Call microflow to save tag
    }

    const toggleConfirmDelete = () => {
        console.warn('toggleConfirmDelete', tagText);
        setConfirmDelete(!confirmDelete);
    }

    const deleteTag = () => {
        const deleteResult = props.deleteTag();
        console.debug('state before:', deleted);
        setDeleted(true);
    }

    const setSpanValue = (value) => {
        // console.warn('setSpanValue', value);
        // console.warn('this.input', input);
        input.current.innerHTML = value;
    }


    return (
        deleted ? null :
            confirmDelete ? buildConfirmDeleteTag() : buildTag()
    )

    function buildTag() {
        return <div className="ev-workflow-tag-container">
            <button className={"ev-workflow-button ev-workflow-icon ev-workflow-edit"} onClick={editMode ? saveTag.bind(this) : toggleEdit.bind(this)}>
                <i className={"mdi" + confirmDelete ? (editMode ? " mdi-check" : " mdi-edit") : ""}></i>
            </button>
            <span ref={input} tabIndex="0" className={"input ev-workflow-input" + (editMode ? " edit-mode" : "")} role="textbox" contenteditable={editMode ? "true" : "false"}></span>
            <button className={"ev-workflow-button ev-workflow-icon ev-workflow-delete"} onClick={editMode ? cancelEdit : toggleConfirmDelete}>
                <i className={editMode ? "mdi mdi-close" : "mdi mdi-delete"}></i>
            </button>
        </div>;
    }

    function buildConfirmDeleteTag() {
        return <div className="ev-workflow-tag-container">
            <button className={"confirm-delete-button confirm-delete-button-left cancel-delete-button"} onClick={toggleConfirmDelete}>
                Cancel
            </button>
            <span className="confirm-delete-text">Are you sure?</span>
            <button className={"confirm-delete-button confirm-delete-button-right ev-workflow-delete"} onClick={deleteTag}>
                Delete
            </button>
        </div>;
    }
}
