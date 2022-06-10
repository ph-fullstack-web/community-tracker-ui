import {Dialog , DialogContent, DialogTitle} from '@mui/material'

const CustomModal = ({className, open , onClose, children, title}) => {
    return ( 
        <Dialog open={open} onClose={onClose} className={className}>
            <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
        </Dialog>
     );
}

export default CustomModal