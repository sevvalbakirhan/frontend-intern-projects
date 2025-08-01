import { Container } from '@mui/material'
import React, { children } from 'react'

function PageContainer({ children }) {
    //header became children 
    return (
        <div>
            <Container maxWidth="lg" >
                {children}
            </Container>
        </div>
    )
}

export default PageContainer
