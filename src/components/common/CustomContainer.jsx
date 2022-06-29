import React from 'react'
import PropTypes from 'prop-types'
import { Card, CardContent } from '@mui/material'

const CustomContainer = ({ children }) => {
    return (
        <Card
            style={{
                marginTop: "3rem",
                marginBottom: "1rem",
                border: "3px solid #9fafc1",
            }}
        >



            <CardContent className="community-container">
                {children}
            </CardContent>
        </Card>
    )
}

CustomContainer.propTypes = {}

export default CustomContainer