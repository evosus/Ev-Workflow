import { Component, createElement } from "react";

import { WorkflowContainer } from "./components/WorkflowContainer";
import "./ui/Workflow.css";

export class Workflow extends Component {
    render() {
        return <WorkflowContainer sampleText={this.props.sampleText} masterTagsList={this.props.masterTagsList} delimiter={this.props.delimiter} />;
    }
}
