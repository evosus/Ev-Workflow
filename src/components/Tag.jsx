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
        this.saveHandler = this.props.saveHandler;
    }

    render() {
        if (this.state.deleted) {
            return null;
        } else if (this.state.confirmDelete) {
            return (
                <div className="ev-workflow-tag-container">
                    <button className={"confirm-delete-button confirm-delete-button-left cancel-delete-button"} onClick={this.toggleConfirmDelete.bind(this)}>
                        Cancel
                    </button>
                    <span className="confirm-delete-text">Are you sure?</span>
                    <button className={"confirm-delete-button confirm-delete-button-right ev-workflow-delete"} onClick={this.deleteTag.bind(this)}>
                        Delete
                    </button>
                </div>
            );
        } else {
            return (
                <div ref={this.container} className="ev-workflow-tag-container">
                    <button className={"ev-workflow-button ev-workflow-icon ev-workflow-edit"} onClick={this.state.editMode ? this.saveTag.bind(this):this.toggleEdit.bind(this)}>
                        <i className={"mdi"+this.state.confirmDelete?(this.state.editMode?" mdi-check":" mdi-edit"):""}></i>
                    </button>
                        <span tabIndex="0" ref={this.input} className={"input ev-workflow-input" + (this.state.editMode?" edit-mode":"")} role="textbox" contenteditable={this.state.editMode?"true":"false"}></span>
                    <button className={"ev-workflow-button ev-workflow-icon ev-workflow-delete"} onClick={this.state.editMode ? this.cancelEdit.bind(this):this.toggleConfirmDelete.bind(this)}>
                        <i className={this.state.editMode ? "mdi mdi-close":"mdi mdi-delete"}></i>
                    </button>
                </div>
            )
        }
    }

    componentDidMount() {
        console.debug('componentDidMount', this.state);
        this.input.current.innerHTML = this.state.tagText;
        this.setSpanValue(this.state.tagText);
    }

    componentDidUpdate() {
        console.debug('componentDidUpdate', this.state);
        console.debug("this.input.current", this.input.current);

        console.debug('this.state.confirmDelete', this.state.confirmDelete);
        console.debug('this.state.editCount', this.state.editCount);
        if (!this.state.confirmDelete) {
            if (this.input.current == null) {
                console.debug('creating new ref');
                this.input = createRef();
            } else if (this.input.current.innerHTML != this.state.tagText) {
                console.debug('setting span value');
                this.setSpanValue(this.state.tagText);
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
        this.saveHandler();
        //TODO: Call microflow to save tag
    }

    toggleConfirmDelete() {
        this.setState(prevState => ({confirmDelete: !prevState.confirmDelete}));
    }

    deleteTag() {
        console.debug('state before:', this.state);
        this.setState({deleted: true});
    }

    setSpanValue(value) {
        console.debug('setSpanValue', value);
        console.debug('this.input', this.input);
        this.input.current.innerHTML = value;
    }
}
