import {ThemeProvider} from 'styled-components'
import theme from "../Style/Theme";




const Header=()=>{
    return(
    <>
        <ThemeProvider theme={theme}>
            <div>
               
            </div>
        </ThemeProvider>
    </>
    )
}

export default Header