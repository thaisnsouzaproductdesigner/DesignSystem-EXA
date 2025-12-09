import imgCompassesDesign from "figma:asset/7734665a1a2498fbfdde6b813dd405ef65a6f83f.png";
import imgSecondLayerUpdate from "figma:asset/2c21f229d616e4c7e67673415c844aa0425aae6f.png";
import imgPenDesign from "figma:asset/f64a596103d556fae2562295e553d21ffe800786.png";
import imgSecondLayerUpdate1 from "figma:asset/ac3f9943ffd3ec38a78d03e78a18efbf1dff0de2.png";
import imgPencilDesign from "figma:asset/ef62ca8b59e8b33901885e0197388f3968e86b8e.png";
import imgSecondLayerUpdate2 from "figma:asset/e111b2bd8b8ae98786ab1fcee1e2aff4bc0616db.png";
import imgColorPaletteDesign from "figma:asset/0829b55bcfb7a57f130279ab47429a54ecd4d531.png";
import imgSecondLayerUpdate3 from "figma:asset/9bc4a4a5d0e9267649cda58cef5d9367bf40c85b.png";
import imgColorPickerDesign from "figma:asset/4a4e3549b14e85757eb58961761467957997f9cc.png";
import imgSecondLayerUpdate4 from "figma:asset/e0cf9734665b6e414d6660b4dab823d83828407e.png";

function GradientLayerUpdate({ className }: { className?: string }) {
  return <div className={className} data-name="Gradient Layer (Update)" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1024 1024\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(3.1351e-15 51.2 -51.2 3.1351e-15 512 512)\\\'><stop stop-color=\\\'rgba(15,60,190,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(15,60,190,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')" }} />;
}

function ColorLayer({ className }: { className?: string }) {
  return (
    <div className={className} data-name="Color Layer">
      <div className="absolute h-[976px] left-0 top-[12px] w-[1000px]" data-name="Compasses - Design">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgCompassesDesign} />
      </div>
      <div className="absolute contents left-0 top-[12px]" data-name="Color Modify">
        <div className="absolute bg-[#1060ff] h-[1400px] left-[calc(50%+200.5px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-47px_235px] mask-size-[1000px_976px] mix-blend-color opacity-60 rounded-[71.429px] top-[calc(50%-23px)] translate-x-[-50%] translate-y-[-50%] w-[1307px]" data-name="Second Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate}')` }} />
        <div className="absolute bg-[#1060ff] h-[1400px] left-[calc(50%+200.5px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-47px_235px] mask-size-[1000px_976px] mix-blend-screen opacity-[0.92] rounded-[71.429px] top-[calc(50%-23px)] translate-x-[-50%] translate-y-[-50%] w-[1307px]" data-name="First Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate}')` }} />
        <GradientLayerUpdate className="absolute blur-[52px] filter left-[calc(50%-188px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[200px_212px] mask-size-[1000px_976px] mix-blend-overlay rounded-[71.429px] size-[1024px] top-[calc(50%-188px)] translate-x-[-50%] translate-y-[-50%]" />
      </div>
    </div>
  );
}

function ColorLayer1({ className }: { className?: string }) {
  return (
    <div className={className} data-name="Color Layer">
      <div className="absolute flex h-[1210.64px] items-center justify-center left-[-113.61px] top-[-105.32px] w-[1227.23px]" style={{ "--transform-inner-width": "1000", "--transform-inner-height": "976" } as React.CSSProperties}>
        <div className="flex-none rotate-[344.263deg]">
          <div className="h-[976px] relative w-[1000px]" data-name="Pen - Design">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPenDesign} />
          </div>
        </div>
      </div>
      <div className="absolute contents h-[1210.64px] left-[-113.61px] top-[-105.32px] w-[1227.23px]" data-name="Color Modify">
        <div className="absolute bg-[#1060ff] h-[1400px] left-[calc(50%-35.51px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[75.391px_209.682px] mask-size-[1227.23px_1210.64px] mix-blend-color opacity-60 rounded-[71.429px] top-[calc(50%-115px)] translate-x-[-50%] translate-y-[-50%] w-[1307px]" data-name="Second Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate1}')` }} />
        <div className="absolute bg-[#1060ff] h-[1400px] left-[calc(50%-35.51px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[75.391px_209.682px] mask-size-[1227.23px_1210.64px] mix-blend-screen opacity-[0.92] rounded-[71.429px] top-[calc(50%-115px)] translate-x-[-50%] translate-y-[-50%] w-[1307px]" data-name="First Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate1}')` }} />
        <GradientLayerUpdate className="absolute blur-[52px] filter left-[calc(50%-224.01px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[122.391px_209.682px] mask-size-[1227.23px_1210.64px] mix-blend-overlay rounded-[71.429px] size-[1024px] top-[calc(50%-303px)] translate-x-[-50%] translate-y-[-50%]" />
      </div>
    </div>
  );
}

function ColorLayer2({ className }: { className?: string }) {
  return (
    <div className={className} data-name="Color Layer">
      <div className="absolute flex h-[1468.6px] items-center justify-center left-[-243.92px] top-[-234.3px] w-[1487.83px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "1171.1875" } as React.CSSProperties}>
        <div className="flex-none rotate-[343.161deg]">
          <div className="h-[1171.2px] relative w-[1200px]" data-name="Pencil - Design">
            <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgPencilDesign} />
          </div>
        </div>
      </div>
      <div className="absolute contents h-[1468.6px] left-[-243.92px] top-[-234.3px] w-[1487.83px]" data-name="Color Modify">
        <div className="absolute bg-[#1060ff] h-[1680px] left-[calc(50%-46.2px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[86.484px_242.498px] mask-size-[1487.82px_1468.6px] mix-blend-color opacity-60 rounded-[71.429px] top-[calc(50%-136.8px)] translate-x-[-50%] translate-y-[-50%] w-[1568.4px]" data-name="Second Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate2}')` }} />
        <div className="absolute bg-[#1060ff] h-[1680px] left-[calc(50%-46.2px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[86.484px_242.498px] mask-size-[1487.82px_1468.6px] mix-blend-screen opacity-[0.92] rounded-[71.429px] top-[calc(50%-136.8px)] translate-x-[-50%] translate-y-[-50%] w-[1568.4px]" data-name="First Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate2}')` }} />
        <div className="absolute blur-[62.4px] filter left-[-385.6px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[141.688px_242.498px] mask-size-[1487.82px_1468.6px] mix-blend-overlay rounded-[71.429px] size-[1228.8px] top-[-476.8px]" data-name="Gradient Layer (Update)" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1228.8 1228.8\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(3.7621e-15 61.44 -61.44 3.7621e-15 614.4 614.4)\\\'><stop stop-color=\\\'rgba(15,60,190,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(15,60,190,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')", maskImage: `url('${imgSecondLayerUpdate2}')` }} />
      </div>
    </div>
  );
}

function ColorLayer3({ className }: { className?: string }) {
  return (
    <div className={className} data-name="Color Layer">
      <div className="absolute h-[1073.6px] left-[-50px] top-[-36.8px] w-[1100px]" data-name="Color Palette - Design">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgColorPaletteDesign} />
      </div>
      <div className="absolute contents left-[-50px] top-[-36.8px]" data-name="Color Modify">
        <div className="absolute bg-[#1060ff] h-[1540px] left-[calc(50%-56.65px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[225.5px_511.5px] mask-size-[1100px_1073.6px] mix-blend-color opacity-60 rounded-[71.429px] top-[calc(50%-278.3px)] translate-x-[-50%] translate-y-[-50%] w-[1437.7px]" data-name="Second Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate3}')` }} />
        <div className="absolute bg-[#1060ff] h-[1540px] left-[calc(50%-56.65px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[225.5px_511.5px] mask-size-[1100px_1073.6px] mix-blend-screen opacity-[0.92] rounded-[71.429px] top-[calc(50%-278.3px)] translate-x-[-50%] translate-y-[-50%] w-[1437.7px]" data-name="First Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate3}')` }} />
        <div className="absolute blur-[57.2px] filter left-[calc(50%-206.8px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[220px_233.2px] mask-size-[1100px_1073.6px] mix-blend-overlay rounded-[71.429px] size-[1126.4px] top-[calc(50%-206.8px)] translate-x-[-50%] translate-y-[-50%]" data-name="Gradient Layer (Update)" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1126.4 1126.4\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(3.4486e-15 56.32 -56.32 3.4486e-15 563.2 563.2)\\\'><stop stop-color=\\\'rgba(15,60,190,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(15,60,190,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')", maskImage: `url('${imgSecondLayerUpdate3}')` }} />
      </div>
    </div>
  );
}

function ColorLayer4({ className }: { className?: string }) {
  return (
    <div className={className} data-name="Color Layer">
      <div className="absolute h-[1180.96px] left-[-105px] top-[-90.48px] w-[1210px]" data-name="Color Picker - Design">
        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgColorPickerDesign} />
      </div>
      <div className="absolute contents left-[-105px] top-[-90.48px]" data-name="Color Modify">
        <div className="absolute bg-[#1060ff] h-[1694px] left-[calc(50%-62.31px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[248.047px_562.651px] mask-size-[1210px_1180.96px] mix-blend-color opacity-60 rounded-[71.429px] top-[calc(50%-306.13px)] translate-x-[-50%] translate-y-[-50%] w-[1581.47px]" data-name="Second Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate4}')` }} />
        <div className="absolute bg-[#1060ff] h-[1694px] left-[calc(50%-62.31px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[248.047px_562.651px] mask-size-[1210px_1180.96px] mix-blend-screen opacity-[0.92] rounded-[71.429px] top-[calc(50%-306.13px)] translate-x-[-50%] translate-y-[-50%] w-[1581.47px]" data-name="First Layer (Update)" style={{ maskImage: `url('${imgSecondLayerUpdate4}')` }} />
        <div className="absolute blur-[62.92px] filter left-[calc(50%-227.48px)] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[242px_256.521px] mask-size-[1210px_1180.96px] mix-blend-overlay rounded-[71.429px] size-[1239.04px] top-[calc(50%-227.48px)] translate-x-[-50%] translate-y-[-50%]" data-name="Gradient Layer (Update)" style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 1239 1239\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(3.7935e-15 61.952 -61.952 3.7935e-15 619.52 619.52)\\\'><stop stop-color=\\\'rgba(15,60,190,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(15,60,190,0)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')", maskImage: `url('${imgSecondLayerUpdate4}')` }} />
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="bg-white box-border content-stretch flex gap-[24.258px] items-center justify-center px-[153.633px] py-[105.117px] relative rounded-[388.125px] shrink-0" data-name="Title">
      <div aria-hidden="true" className="absolute border-[#e1e4ed] border-[4.043px] border-solid inset-0 pointer-events-none rounded-[388.125px] shadow-[0px_16.172px_40.43px_0px_rgba(20,20,43,0.04)]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[230px] not-italic relative shrink-0 text-[#19213d] text-[230px] text-nowrap whitespace-pre">Design</p>
    </div>
  );
}

function Heading() {
  return (
    <div className="bg-[#f1f3f7] h-[776px] relative rounded-[223.748px] shrink-0 w-full" data-name="Heading">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex gap-[117.225px] h-[776px] items-center px-[220px] py-0 relative w-full">
          <Title />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border-[#f1f3f7] border-[1.017px] border-solid inset-0 pointer-events-none rounded-[223.748px] shadow-[0px_17.133px_59.965px_0px_rgba(183,183,183,0.02),0px_85.664px_171.327px_0px_rgba(183,183,183,0.06)]" />
    </div>
  );
}

function Wrap() {
  return (
    <div className="absolute content-stretch flex gap-[600px] items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Wrap">
      <ColorLayer4 className="overflow-clip relative shrink-0 size-[1000px]" />
    </div>
  );
}

function Badge() {
  return (
    <div className="absolute bg-[#f1f3f7] box-border content-stretch flex gap-[20.682px] items-center justify-center left-0 px-[140px] py-[101px] rounded-[330.92px] top-[-400px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border-[#e1e4ed] border-[3.447px] border-solid inset-0 pointer-events-none rounded-[330.92px] shadow-[0px_13.788px_34.471px_0px_rgba(20,20,43,0.08)]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[120px] not-italic relative shrink-0 text-[#19213d] text-[120px] text-nowrap whitespace-pre">Color Picker</p>
    </div>
  );
}

function ColorPicker() {
  return (
    <div className="bg-[#19213d] relative rounded-[200px] shrink-0 size-[2400px]" data-name="Color Picker">
      <div aria-hidden="true" className="absolute border-[#f1f3f7] border-[12px] border-solid inset-0 pointer-events-none rounded-[200px]" />
      <Wrap />
      <Badge />
    </div>
  );
}

function Wrap1() {
  return (
    <div className="absolute content-stretch flex gap-[600px] items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Wrap">
      <ColorLayer3 className="overflow-clip relative shrink-0 size-[1000px]" />
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bg-[#f1f3f7] box-border content-stretch flex gap-[20.682px] items-center justify-center left-0 px-[140px] py-[101px] rounded-[330.92px] top-[-400px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border-[#e1e4ed] border-[3.447px] border-solid inset-0 pointer-events-none rounded-[330.92px] shadow-[0px_13.788px_34.471px_0px_rgba(20,20,43,0.08)]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[120px] not-italic relative shrink-0 text-[#19213d] text-[120px] text-nowrap whitespace-pre">Color Palette</p>
    </div>
  );
}

function ColorPalette() {
  return (
    <div className="bg-[#19213d] relative rounded-[200px] shrink-0 size-[2400px]" data-name="Color Palette">
      <div aria-hidden="true" className="absolute border-[#f1f3f7] border-[12px] border-solid inset-0 pointer-events-none rounded-[200px]" />
      <Wrap1 />
      <Badge1 />
    </div>
  );
}

function Wrap2() {
  return (
    <div className="absolute content-stretch flex gap-[600px] items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Wrap">
      <ColorLayer2 className="overflow-clip relative shrink-0 size-[1000px]" />
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-[#f1f3f7] box-border content-stretch flex gap-[20.682px] items-center justify-center left-0 px-[140px] py-[101px] rounded-[330.92px] top-[-400px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border-[#e1e4ed] border-[3.447px] border-solid inset-0 pointer-events-none rounded-[330.92px] shadow-[0px_13.788px_34.471px_0px_rgba(20,20,43,0.08)]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[120px] not-italic relative shrink-0 text-[#19213d] text-[120px] text-nowrap whitespace-pre">Pencil</p>
    </div>
  );
}

function Pencil() {
  return (
    <div className="bg-[#19213d] relative rounded-[200px] shrink-0 size-[2400px]" data-name="Pencil">
      <div aria-hidden="true" className="absolute border-[#f1f3f7] border-[12px] border-solid inset-0 pointer-events-none rounded-[200px]" />
      <Wrap2 />
      <Badge2 />
    </div>
  );
}

function Wrap3() {
  return (
    <div className="absolute content-stretch flex gap-[600px] items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Wrap">
      <ColorLayer1 className="overflow-clip relative shrink-0 size-[1000px]" />
    </div>
  );
}

function Badge3() {
  return (
    <div className="absolute bg-[#f1f3f7] box-border content-stretch flex gap-[20.682px] items-center justify-center left-0 px-[140px] py-[101px] rounded-[330.92px] top-[-400px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border-[#e1e4ed] border-[3.447px] border-solid inset-0 pointer-events-none rounded-[330.92px] shadow-[0px_13.788px_34.471px_0px_rgba(20,20,43,0.08)]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[120px] not-italic relative shrink-0 text-[#19213d] text-[120px] text-nowrap whitespace-pre">Pen</p>
    </div>
  );
}

function Pen() {
  return (
    <div className="bg-[#19213d] relative rounded-[200px] shrink-0 size-[2400px]" data-name="Pen">
      <div aria-hidden="true" className="absolute border-[#f1f3f7] border-[12px] border-solid inset-0 pointer-events-none rounded-[200px]" />
      <Wrap3 />
      <Badge3 />
    </div>
  );
}

function Wrap4() {
  return (
    <div className="absolute content-stretch flex gap-[600px] items-center left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="Wrap">
      <ColorLayer className="overflow-clip relative shrink-0 size-[1000px]" />
    </div>
  );
}

function Badge4() {
  return (
    <div className="absolute bg-[#f1f3f7] box-border content-stretch flex gap-[20.682px] items-center justify-center left-0 px-[140px] py-[101px] rounded-[330.92px] top-[-400px]" data-name="Badge">
      <div aria-hidden="true" className="absolute border-[#e1e4ed] border-[3.447px] border-solid inset-0 pointer-events-none rounded-[330.92px] shadow-[0px_13.788px_34.471px_0px_rgba(20,20,43,0.08)]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[120px] not-italic relative shrink-0 text-[#19213d] text-[120px] text-nowrap whitespace-pre">Compasses</p>
    </div>
  );
}

function Compasses() {
  return (
    <div className="bg-[#19213d] relative rounded-[200px] shrink-0 size-[2400px]" data-name="Compasses">
      <div aria-hidden="true" className="absolute border-[#f1f3f7] border-[12px] border-solid inset-0 pointer-events-none rounded-[200px]" />
      <Wrap4 />
      <Badge4 />
    </div>
  );
}

function Wrap5() {
  return (
    <div className="content-start flex flex-wrap gap-[400px] items-start relative shrink-0 w-[10800px]" data-name="Wrap">
      <ColorPicker />
      <ColorPalette />
      <Pencil />
      <Pen />
      <Compasses />
    </div>
  );
}

export default function Design() {
  return (
    <div className="bg-white relative rounded-[400px] size-full" data-name="Design">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[1200px] items-start p-[540px] relative size-full">
          <Heading />
          <Wrap5 />
        </div>
      </div>
    </div>
  );
}
