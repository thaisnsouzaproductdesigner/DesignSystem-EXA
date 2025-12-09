import imgSecondLayerUpdate from "figma:asset/4dce5af3b18d2ed11d9e817e6cd04f1dcf53fa4a.png";
import imgLaptopDevices from "figma:asset/2c05c6d3b41c3d06a5f29b9d85428ab31b44e19f.png";

function SecondLayerUpdate() {
  return <div className="absolute bg-[#1060ff] h-[1540px] left-[calc(50%+51.15px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[223.297px_455.4px] mask-size-[888.801px_866.801px] mix-blend-color opacity-60 rounded-[78.571px] top-[calc(50%-118.8px)] translate-x-[-50%] translate-y-[-50%] w-[1437.7px]" data-name="Second Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate}')` }} />;
}

function FirstLayerUpdate() {
  return <div className="absolute bg-[#1060ff] h-[1540px] left-[calc(50%+51.15px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[223.297px_455.4px] mask-size-[888.801px_866.801px] mix-blend-screen opacity-[0.92] rounded-[78.571px] top-[calc(50%-118.8px)] translate-x-[-50%] translate-y-[-50%] w-[1437.7px]" data-name="First Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate}')` }} />;
}

function GradientLayerUpdate() {
  return <div className="absolute blur-[57.2px] filter left-[-172.1px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[227.703px_336.6px] mask-size-[888.801px_866.801px] mix-blend-overlay rounded-[78.571px] size-[1540px] top-[-270px]" data-name="Gradient Layer (Update)" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1540 1540\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(4.7149e-15 77 -77 4.7149e-15 770 770)\\\'><stop stop-color=\\\'rgba(15,60,190,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(15,60,190,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')", maskImage: `url('${imgSecondLayerUpdate}')` }} />;
}

function ColorModify() {
  return (
    <div className="absolute contents left-[55.6px] top-[66.6px]" data-name="Color Modify">
      <SecondLayerUpdate />
      <FirstLayerUpdate />
      <GradientLayerUpdate />
    </div>
  );
}

export default function ColorLayer() {
  return (
    <div className="relative size-full" data-name="Color Layer">
      <div className="absolute h-[866.8px] left-[55.6px] top-[66.6px] w-[888.8px]" data-name="Laptop - Devices">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgLaptopDevices} />
      </div>
      <ColorModify />
    </div>
  );
}
