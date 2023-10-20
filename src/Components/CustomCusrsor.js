// Code is from https://dev.to/holdmypotion/react-custom-cursor-no-extra-dependencies-25ki

import useMousePosition from "../CustomHooks/useMousePosition";

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  return (
    <>
      <div
        style={{ left: `${x}px`, top: `${y}px` }}
        className="custom-cursor"
      ></div>
    </>
  );
};

export default CustomCursor;