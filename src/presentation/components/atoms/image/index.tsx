import { ImgHTMLAttributes } from "react";
import { ImageCustom } from "./styles";

export interface IImage extends ImgHTMLAttributes<HTMLImageElement> {}

function Image(props: IImage) {
  const { alt } = props;

  return <ImageCustom aria-label={alt} {...props} />;
}

export { Image };
