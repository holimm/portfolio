import { useMemo, useRef } from "react";

import { modalVariants, type ModalVariantProps } from "../styles/modal.config";

export interface ModalProps extends ModalVariantProps {
  open?: boolean;
  onCancel?: () => void;
  ref?: React.Ref<HTMLDivElement> | undefined;
}
export type UseModalProps = ModalProps &
  Omit<ModalVariantProps, keyof ModalVariantProps>;

export const useModal = (props: UseModalProps) => {
  const { ref: modalRef, open, onCancel, variant = "default" } = props;
  const contentRef = useRef(null);

  const {
    root: modalStyle,
    content: modalContentStyle,
    overlay: modalOverlayStyle,
  } = useMemo(
    () =>
      modalVariants({
        variant,
      }),
    [variant],
  );
  return {
    variant,
    open,
    onCancel,
    modalStyle,
    modalContentStyle,
    modalOverlayStyle,
    modalRef,
    contentRef,
  };
};
