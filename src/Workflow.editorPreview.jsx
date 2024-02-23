import { Component, createElement } from "react";
import { WorkflowContainer } from "./components/WorkflowContainer";

export class preview extends Component {
    render() {
        return <WorkflowContainer sampleText={this.props.sampleText} masterTagsList={this.props.masterTagsList} delimiter={this.props.delimiter}/>;
    }
}

export function getPreviewCss() {
    return require("./ui/Workflow.css");
}
