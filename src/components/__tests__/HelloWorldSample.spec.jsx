import { createElement } from "react";
import { shallow } from "enzyme";

import { Workflow } from "../Workflow";

describe("Workflow", () => {
    const createHelloWorld = (props) => shallow(<Workflow {...props} />);

    it("should render the structure correctly", () => {
        const helloWorldProps = {
            sampleText: "World"
        };
        const helloWorld = createHelloWorld(helloWorldProps);

        expect(
            helloWorld.equals(
                <div className="widget-hello-world">Hello {helloWorldProps.sampleText}</div>
            )
        ).toEqual(true);
    });
});
