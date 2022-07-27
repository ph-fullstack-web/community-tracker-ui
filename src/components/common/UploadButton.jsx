import { Button } from "@mui/material";
import { useSwitchThemeContext } from "hooks";

const UploadButton = ({ children, variant, onChangeEvent, sx: restOfSxProp, ...otherProps }) => {
    const { currentTheme, currentThemePalette } = useSwitchThemeContext();

    return (
        <Button variant={variant ? variant : "contained"} component="label"
            sx={{
                backgroundColor: currentThemePalette.medium,
                border: currentTheme === "dark" ? `1px solid ${currentThemePalette.light}` : null,
                "&:hover": {
                  backgroundColor: currentThemePalette.dark
                },
                ...restOfSxProp
            }}
            {...otherProps}
        >
            {children}
            <input hidden accept="image/*" type="file" onChange={onChangeEvent} />
        </Button>
    );
};

export default UploadButton;