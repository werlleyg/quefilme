import { ImgHTMLAttributes, useState } from "react";
import { ImageCustom } from "./styles";

export interface IImage extends ImgHTMLAttributes<HTMLImageElement> {}

const kDefaultImageUrl = "/assets/images/default_image.png";

function Image(props: IImage) {
  const { alt } = props;

  const [imageSrc, setImageSrc] = useState<string>(
    props.src ?? kDefaultImageUrl,
  );

  return (
    <ImageCustom
      aria-label={alt}
      {...props}
      src={imageSrc}
      onError={() => setImageSrc(kDefaultImageUrl)}
    />
  );
}

export { Image };
