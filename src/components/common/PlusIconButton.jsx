import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import useSwitchThemeContext from 'hooks/Theme/useSwitchThemeContext';

const PlusIconButton = ({
  title,
  ariaLabel,
  color,
  size,
  sxProp,
  onClickCallback,
}) => {
  const { currentThemePalette } = useSwitchThemeContext();

  return (
    <IconButton
      title={title}
      aria-label={ariaLabel}
      color={color ? color : 'primary'}
      size={size ? size : 'medium'}
      sx={sxProp}
      onClick={onClickCallback}>
      <AddCircleOutlineIcon
        fontSize="large"
        style={{
          color: currentThemePalette.main,
          fontWeight: '700',
        }}
      />
    </IconButton>
  );
};

export default PlusIconButton;
