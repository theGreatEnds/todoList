import {ThemeProvider} from 'styled-components'
import theme from "../Style/Theme";




const Header=()=>{
    return(
    <>
        <ThemeProvider theme={theme}>
            <div>
                헤에더
            </div>
        </ThemeProvider>
    </>
    )
}

export default Header