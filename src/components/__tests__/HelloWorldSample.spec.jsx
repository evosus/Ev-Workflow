import { createElement } from "react";
import { shallow } from "enzyme";

import { AliasTags } from "../AliasTags";

describe("AliasTags", () => {
    const createHelloWorld = (props) => shallow(<AliasTags {...props} />);

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
