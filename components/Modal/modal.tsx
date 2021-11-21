import { useState, useEffect, useCallback } from "react";
import ClientOnlyPortal from "./clientOnlyPortal";
import OutsideClickHandler from "react-outside-click-handler";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import cn from "classnames";
import Icon from "../Icon";
import styles from "./Modal.module.sass";

export default function Modal({
  outerClassName,
  containerClassName,
  visible,
  onClose,
  children,
}: any) {
  const [open, setOpen] = useState() as any;

  const escFunction = useCallback(
    (e) => {
      if (e.keyCode === 27) {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, [escFunction]);

  // useEffect(() => {
  //   if (visible) {
  //     const target = document.querySelector("#modal");
  //     disableBodyScroll(target);
  //   } else {
  //     clearAllBodyScrollLocks();
  //   }
  // }, [visible]);

  return (
    <>
      {visible && (
        <ClientOnlyPortal selector="#modal">
          <div className={styles.modal} id="modal">
            <div className={cn(styles.outer, outerClassName)}>
              <OutsideClickHandler onOutsideClick={onClose}>
                <div className={cn(styles.container, containerClassName)}>
                  {children}
                  <button className={styles.close} onClick={onClose}>
                    <Icon name="close" size="14" />
                  </button>
                </div>
              </OutsideClickHandler>
            </div>
            <style jsx>{`
              :global(body) {
                overflow: hidden;
              }

              .backdrop {
                position: fixed;
                background-color: rgba(0, 0, 0, 0.7);
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
              }

              .modal {
                background-color: white;
                position: absolute;
                top: 10%;
                right: 10%;
                bottom: 10%;
                left: 10%;
                padding: 1em;
              }
            `}</style>
          </div>
        </ClientOnlyPortal>
      )}
    </>
  );
}
