import { Component, createRef, createElement } from "react";

export class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            confirmDelete: false,
            tagText: props.tag,
            originalTagText: props.tag
        }
        this.inputWrap = createRef();
        this.input = createRef();
        this.widthMachine = createRef();
    }

    render() {
        return (
            <div className="alias-tag-container">
                <button className={"alias-tag-button alias-tag-icon alias-tag-edit"} onClick={this.state.editMode ? this.saveTag.bind(this):this.toggleEdit.bind(this)}>
                    <i className={"mdi"+this.state.confirmDelete?(this.state.editMode?" mdi-check":" mdi-edit"):""}></i>
                </button>
                {/* <span className={"alias-tag-button alias-tag-text" + (this.state.editMode?" edit-mode":"")} type="text" 
                        onChange={this.handleTagChange.bind(this)} value={this.state.tagText} defaultValue={this.state.tagText} contentEditable={this.state.editMode?"contentEditable":""}/> */}
                <span ref={this.inputWrap} class="input-wrap" onKeyUp={this.runWidthMachine.bind(this)}>
                    <span ref={this.widthMachine} class="width-machine" aria-hidden="true">{this.state.tagText}</span>
                    <input ref={this.input} class="input" type="text" onKeyUp={this.runWidthMachine.bind(this)} disabled={this.state.editMode?"":"disabled"} value={this.state.tagText}/>
                </span>
                <button className={"alias-tag-button alias-tag-icon alias-tag-delete"} onClick={this.state.editMode ? this.cancelEdit.bind(this):this.deleteTag.bind(this)}>
                    <i className={this.state.editMode ? "mdi mdi-close":"mdi mdi-delete"}></i>
                </button>
            </div>
        )
    }

    // componentDidMount() {
    //     this.inputWrap.addEventListener("keyup", this.runWidthMachine);
    //     this.widthMachine.addEventListener("keyup", this.runWidthMachine);
    // }
    
    toggleEdit() {
        console.debug("toggleEdit")
        try {
            console.info(this.state.tagText);
        } catch (e) {
            console.error(e);
        }
        this.setState(prevState => ({
            editMode: !prevState.editMode
        }));
    }

    cancelEdit() {
        console.debug("cancelEdit");
        console.debug("current text: " + this.state.tagText);
        this.setState(prevState => ({
            tagText: prevState.originalTagText
        }));
        console.debug("set tagText back to: " + this.state.tagText);
    }

    saveTag() {
        console.debug("saveTag")
        this.toggleEdit();
        this.setState(prevState => ({
            originalTagText: prevState.tagText
        }));
        //TODO: Call microflow to save tag
    }

    deleteTag() {
        console.debug("deleteTag");
        if (this.state.confirmDelete) {
            //TODO: Delete tag via microflow
            this.setState({confirmDelete: false})
        } else {
            this.setState({confirmDelete: true})
        }
    }

    handleTagChange(event) {
        console.debug("handleTagChange")
        this.setState({
            tagText: event.target.value
        });
    }

    runWidthMachine(event) {
        console.info("runWidthMachine", this.state);
        console.info("event.target.value", event.target.value);
        console.info("this.input.current.innerHTML", this.input.current.innerHTML);
        // this.widthMachine.innerHTML = this.input.current.innerHTML;
        this.setState({
            tagText: event.target.value
        })
        // this.widthMachine.current.innerHTML = this.input.current.innerHTML;
    }
}
