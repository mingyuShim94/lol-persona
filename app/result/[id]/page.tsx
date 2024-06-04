import React from "react";

const Result = (props: any) => {
  console.log(props);
  return (
    <div>
      <h1>Result/{props.params.id}</h1>
    </div>
  );
};

export const runtime = "edge";

export default Result;
