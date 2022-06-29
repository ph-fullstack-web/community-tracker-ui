import React from 'react'
import { Button } from '@mui/material'

const CustomButton = ({ name, onClick, type = "button", width = "100%", size = "large", variant = "contained", ...props }) => {
    return (
        <Button onClick={onClick} variant={variant} type={type} sx={{
            width,
            ...props
        }}>{name}</Button>
    )
}

export default CustomButton