import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const PlusIconButton = ({
  title,
  ariaLabel,
  color,
  size,
  sxProp,
  onClickCallback,
}) => {
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
          color: '#74808d',
          fontWeight: '700',
        }}
      />
    </IconButton>
  );
};

export default PlusIconButton;
