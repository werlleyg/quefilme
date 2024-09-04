import { FullScreenModal } from "@/presentation";
import { render } from "@testing-library/react";

describe("FullScreenModal Component", () => {
  beforeEach(() => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.width = "";
    document.body.style.paddingRight = "";
    window.scrollTo = jest.fn();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("Should render children when modal is open", () => {
    const { getByText } = render(
      <FullScreenModal isOpen={true}>
        <div>Modal Content</div>
      </FullScreenModal>,
    );
    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  it("Should render children when modal is closed", () => {
    const { getByText } = render(
      <FullScreenModal isOpen={false}>
        <div>Modal Content</div>
      </FullScreenModal>,
    );
    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  it("Should apply styles to disable scroll when modal is open", () => {
    render(
      <FullScreenModal isOpen={true}>
        <div>Modal Content</div>
      </FullScreenModal>,
    );

    const scrollY = document.body.style.top;
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    expect(document.body.style.position).toBe("fixed");
    expect(document.body.style.top).toBe(`${scrollY}`);
    expect(document.body.style.left).toBe("0px");
    expect(document.body.style.width).toBe("100%");
    expect(document.body.style.paddingRight).toBe(`${scrollBarWidth}px`);
  });

  it("Should remove styles and re-enable scroll when modal is closed", () => {
    const initialScrollY = "-100px";
    document.body.style.top = initialScrollY;

    const { rerender } = render(
      <FullScreenModal isOpen={true}>
        <div>Modal Content</div>
      </FullScreenModal>,
    );

    rerender(
      <FullScreenModal isOpen={false}>
        <div>Modal Content</div>
      </FullScreenModal>,
    );

    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
    expect(document.body.style.left).toBe("");
    expect(document.body.style.width).toBe("");
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("Should call enableScroll on component unmount", () => {
    const { unmount } = render(
      <FullScreenModal isOpen={true}>
        <div>Modal Content</div>
      </FullScreenModal>,
    );

    unmount();

    expect(document.body.style.position).toBe("");
    expect(document.body.style.top).toBe("");
    expect(document.body.style.left).toBe("");
    expect(document.body.style.width).toBe("");
  });
});
