import { useRef } from "react";
import { MenuButton } from "../../components/shared/MenuButton";
import { TextColor } from "../../components/shared/Icons";

export const TextColorOption = ({ color = "#000", onChange }) => {
  const colorInputRef = useRef();

  return (
    <MenuButton
      icon={({ color: iconColor, size }) => (
        <>
          <TextColor size={size} color={iconColor} underlineColor={color} />
          <input
            ref={colorInputRef}
            type="color"
            onChange={event => onChange && onChange(event.target.value)}
          />
        </>
      )}
      iconActive={false}
      onClick={() => colorInputRef.current?.click()}
      tooltipProps={{ content: "Text Color", position: "bottom", delay: [500] }}
      data-cy="scooter-editor-fixed-menu-text-color-option"
    />
  );
};

export default TextColorOption;
