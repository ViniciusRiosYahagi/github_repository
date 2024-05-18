import { BrowserRouter, Route, Routes } from "react-router-dom"
import Main from "./src/pages/Main"
import Repository from "./src/pages/Respository"


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Main} />
                <Route path="/repository/:repository" Component={Repository} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes

