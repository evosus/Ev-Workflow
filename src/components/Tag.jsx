import { Component, createRef, createElement } from "react";

export class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            confirmDelete: false,
            tagText: props.tag,
            originalTagText: props.tag,
            deleted: false,
            editCount: 0,
            hover: false
        }
        this.container = createRef();
        this.input = createRef();
    }

    render() {
        if (this.state.deleted) {
            // return <div>I"VE BEEN DELETED!</div>
            return null;
        } else if (this.state.confirmDelete) {
            return (
                <div className="alias-tag-container">
                    <button className={"confirm-delete-button confirm-delete-button-left cancel-delete-button"} onClick={this.toggleConfirmDelete.bind(this)}>
                        Cancel
                    </button>
                    <span className="confirm-delete-text">Are you sure?</span>
                    <button className={"confirm-delete-button confirm-delete-button-right alias-tag-delete"} onClick={this.deleteTag.bind(this)}>
                        Delete
                    </button>
                </div>
            );
        } else {
            return (
                <div ref={this.container} className="alias-tag-container">
                    <button className={"alias-tag-button alias-tag-icon alias-tag-edit"} onClick={this.state.editMode ? this.saveTag.bind(this):this.toggleEdit.bind(this)}>
                        <i className={"mdi"+this.state.confirmDelete?(this.state.editMode?" mdi-check":" mdi-edit"):""}></i>
                    </button>
                        <span tabIndex="0" ref={this.input} className={"input alias-tag-input" + (this.state.editMode?" edit-mode":"")} role="textbox" contenteditable={this.state.editMode?"true":"false"}></span>
                    <button className={"alias-tag-button alias-tag-icon alias-tag-delete"} onClick={this.state.editMode ? this.cancelEdit.bind(this):this.toggleConfirmDelete.bind(this)}>
                        <i className={this.state.editMode ? "mdi mdi-close":"mdi mdi-delete"}></i>
                    </button>
                </div>
            )
        }
    }

    componentDidMount() {
        console.log('componentDidMount', this.state);
        this.input.current.innerHTML = this.state.tagText;
        this.setSpanValue(this.state.tagText);
    }

    componentDidUpdate() {
        console.log('componentDidUpdate', this.state);
        console.log("this.input.current", this.input.current);

        console.log('this.state.confirmDelete', this.state.confirmDelete);
        console.log('this.state.editCount', this.state.editCount);
        if (!this.state.confirmDelete) {
            if (this.input.current == null) {
                console.error('creating new ref');
                this.input = createRef();
            } else if (this.input.current.innerHTML != this.state.tagText) {
                console.error('setting span value');
                this.setSpanValue(this.state.tagText);
            } else {
                console.error('not doing a thing');
            }
        }       
    }
    
    toggleEdit() {
        console.debug("toggleEdit")
        try {
            console.info(this.state.tagText);
        } catch (e) {
            console.error(e);
        }
        this.setState(prevState => ({
            editMode: !prevState.editMode,
            editCount: prevState.editCount+1
        }));
    }

    cancelEdit() {
        console.debug("cancelEdit");
        console.debug("current text: " + this.state.tagText);
        this.setState(prevState => ({
            tagText: prevState.originalTagText
        }));
        this.setSpanValue(this.state.originalTagText);
        console.debug("set tagText back to: " + this.state.tagText);
    }

    saveTag() {
        console.debug("saveTag");
        var newTagText = this.input.current.innerHTML;
        this.toggleEdit();
        console.info("newTagText", newTagText);
        this.setState({
            tagText: newTagText,
            originalTagText: newTagText
        });
        //TODO: Call microflow to save tag
    }

    toggleConfirmDelete() {
        this.setState(prevState => ({confirmDelete: !prevState.confirmDelete}));
    }

    deleteTag() {
        console.error('state before:', this.state);
        this.setState({deleted: true});
    }

    setSpanValue(value) {
        console.error('setSpanValue', value);
        console.error('this.input', this.input);
        this.input.current.innerHTML = value;
    }
}
