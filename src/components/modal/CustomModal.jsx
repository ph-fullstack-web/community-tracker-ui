const { Modal } = require("@mui/material");
const { Box } = require("@mui/system");

const CustomModal = ({open , onClose, children , style}) => {
    return ( 
        <Modal open={open} onClose={onClose}>
            <Box sx={style}>
                {children}
            </Box>
        </Modal>
     );
}

export default CustomModal