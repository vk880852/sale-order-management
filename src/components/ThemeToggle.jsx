import React from 'react'
import { useColorMode, Button } from '@chakra-ui/react';
const ThemeToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode('');
    return (
      <header>
        <Button onClick={toggleColorMode}>
         {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </header>
    )
}

export default ThemeToggle
