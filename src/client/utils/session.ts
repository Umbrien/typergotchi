export function isKeyNonTypeable(key: string) {
  // excluding Space and Backspace since they are used for typing
  return (
    key === "Shift" ||
    key === "Control" ||
    key === "Alt" ||
    key === "AltGraph" ||
    key === "Meta" ||
    key === "CapsLock" ||
    key === "Esc" ||
    key === "Tab" ||
    key === "Enter" ||
    key === "PageUp" ||
    key === "PageDown" ||
    key === "ArrowUp" ||
    key === "ArrowDown" ||
    key === "ArrowLeft" ||
    key === "ArrowRight" ||
    key === "Delete" ||
    key === "Pause" ||
    key === "NumLock" ||
    key === "ScrollLock" ||
    key === "Insert" ||
    key === "Home" ||
    key === "End" ||
    key === "PrintScreen" ||
    key === "ContextMenu" ||
    key === "Unidentified" ||
    key === "F1" ||
    key === "F2" ||
    key === "F3" ||
    key === "F4" ||
    key === "F5" ||
    key === "F6" ||
    key === "F7" ||
    key === "F8" ||
    key === "F9" ||
    key === "F10" ||
    key === "F11" ||
    key === "F12"
  );
}
