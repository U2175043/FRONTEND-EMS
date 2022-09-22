import { css } from "@emotion/react";
import React from "react";
import { RingLoader } from "react-spinners";

const override = css`
  margin: auto;
  height: 100%;
  display: inline-flex;
  align-items: center;
`;

function NotFound() {
  return (
    <div
    className="h-full w-full text-center">
      <div id="loading-bar">
        <RingLoader
          css={override}
          sizenit={"px"}
          size={200}
          color={"#0000ff"}
          loading={true}
        />
      </div>
    </div>
  );
}

export default NotFound;
