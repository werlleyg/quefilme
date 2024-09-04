import { ReactNode, useEffect } from "react";
import { Container } from "./styles";

export interface IFullScreenModal {
  isOpen: boolean;
  children: ReactNode;
}

function FullScreenModal(props: IFullScreenModal) {
  const { children, isOpen } = props;

  const disableScroll = () => {
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.left = "0";
    document.body.style.width = "100%";
    document.body.style.paddingRight = `${scrollBarWidth}px`;
  };

  const enableScroll = () => {
    const scrollY = document.body.style.top;
    const scrollBarWidth = document.body.style.paddingRight;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.width = "";
    document.body.style.paddingRight = "";
    window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  };

  useEffect(() => {
    if (isOpen) {
      disableScroll();
    } else {
      enableScroll();
    }

    return () => enableScroll();
  }, [isOpen]);

  return <Container {...props}>{children}</Container>;
}

export { FullScreenModal };
